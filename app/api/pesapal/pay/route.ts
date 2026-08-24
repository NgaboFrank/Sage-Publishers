import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-admin'

const PESAPAL_API = 'https://pay.pesapal.com/v3/api'
const PESAPAL_IPN_ID = process.env.PESAPAL_IPN_ID

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = String(body.name || '').trim(); const email = String(body.email || '').trim(); const phone = String(body.phone || '').trim(); const amount = Number(body.amount)
    if (!name || !email || !phone || !amount || amount <= 0) return NextResponse.json({ error:'Please provide your name, email, phone number and a valid amount.' }, { status:400 })
    const consumerKey = process.env.PESAPAL_CONSUMER_KEY; const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET
    if (!consumerKey || !consumerSecret) return NextResponse.json({ error:'Pesapal credentials are not configured on the server.' }, { status:500 })
    if (!PESAPAL_IPN_ID) return NextResponse.json({ error:'Pesapal IPN ID has not been configured yet.' }, { status:500 })

    const authResponse = await fetch(`${PESAPAL_API}/Auth/RequestToken`, { method:'POST', headers:{Accept:'application/json','Content-Type':'application/json'}, body:JSON.stringify({consumer_key:consumerKey,consumer_secret:consumerSecret}), cache:'no-store' })
    const authData = await authResponse.json(); if (!authResponse.ok || !authData.token) return NextResponse.json({ error:authData?.error?.message || authData?.message || 'Pesapal authentication failed.' }, { status:502 })
    const token = authData.token
    const merchantReference = `SAGE-${Date.now()}-${Math.random().toString(36).substring(2,8).toUpperCase()}`
    const orderNumber = `SAGE-${Date.now()}`

    const customers = await supabaseAdmin<Array<{id:string}>>(`customers?select=id&email=eq.${encodeURIComponent(email)}&limit=1`)
    const customer = customers[0] || (await supabaseAdmin<Array<{id:string}>>('customers', { method:'POST', body:JSON.stringify({name,email,phone}) }))[0]
    await supabaseAdmin('orders', { method:'POST', body:JSON.stringify({ order_number:orderNumber, customer_id:customer?.id || null, amount, currency:'RWF', payment_status:'PENDING', order_status:'NEW', merchant_reference:merchantReference }) })

    const parts = name.split(/\s+/); const firstName = parts.shift() || name; const lastName = parts.join(' ') || ''
    const orderResponse = await fetch(`${PESAPAL_API}/Transactions/SubmitOrderRequest`, { method:'POST', headers:{Accept:'application/json','Content-Type':'application/json',Authorization:`Bearer ${token}`}, body:JSON.stringify({ id:merchantReference, currency:'RWF', amount, description:'Payment to Sage Publishers', callback_url:'https://sagepublishersltd.com/payment/result', cancellation_url:'https://sagepublishersltd.com/payment', notification_id:PESAPAL_IPN_ID, redirect_mode:'TOP_WINDOW', billing_address:{email_address:email,phone_number:phone,country_code:'RW',first_name:firstName,middle_name:'',last_name:lastName,line_1:'',line_2:'',city:'Kigali',state:'',postal_code:'',zip_code:''} }), cache:'no-store' })
    const orderData = await orderResponse.json()
    if (!orderResponse.ok || !orderData.redirect_url) return NextResponse.json({ error:orderData?.error?.message || orderData?.message || 'Pesapal could not create the payment.' }, { status:502 })
    await supabaseAdmin(`orders?merchant_reference=eq.${encodeURIComponent(merchantReference)}`, { method:'PATCH', body:JSON.stringify({ pesapal_tracking_id:orderData.order_tracking_id }) })
    return NextResponse.json({ success:true, redirect_url:orderData.redirect_url, order_tracking_id:orderData.order_tracking_id, merchant_reference:orderData.merchant_reference || merchantReference })
  } catch (error) {
    console.error('Payment API error:', error)
    return NextResponse.json({ error:'Unable to start the payment. Please try again.' }, { status:500 })
  }
}
