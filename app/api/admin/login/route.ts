import { NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { supabaseAdmin } from '../../../../lib/supabase-admin'

function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body.email || '').trim().toLowerCase()
    const password = String(body.password || '')
    if (!email || !password) return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })

    const admins = await supabaseAdmin<Array<{id:string;email:string;name:string;password_hash:string}>>(`admins?select=id,email,name,password_hash&email=eq.${encodeURIComponent(email)}&limit=1`)
    const admin = admins[0]
    if (!admin || admin.password_hash !== hashPassword(password)) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const response = NextResponse.json({ ok: true, admin: { id: admin.id, email: admin.email, name: admin.name } })
    response.cookies.set('sage_admin', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 })
    response.cookies.set('sage_admin_id', admin.id, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 })
    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to sign in.' }, { status: 500 })
  }
}
