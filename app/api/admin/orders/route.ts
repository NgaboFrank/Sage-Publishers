import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-admin'

export async function GET() {
  try {
    const orders = await supabaseAdmin('orders?select=*,customers(name,email,phone),books(title)&order=created_at.desc')
    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load orders.' }, { status: 500 })
  }
}
