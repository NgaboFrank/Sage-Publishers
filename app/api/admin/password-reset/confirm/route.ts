import { NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { supabaseAdmin } from '../../../../../lib/supabase-admin'
import { verifyPasswordResetToken } from '../../../../../lib/password-reset-token'

function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()
    const newPassword = String(password || '')
    if (!token || newPassword.length < 8) return NextResponse.json({ error: 'Use a password of at least 8 characters.' }, { status: 400 })

    const parsed = verifyPasswordResetToken(String(token))
    if (!parsed) return NextResponse.json({ error: 'This reset link is invalid or has expired.' }, { status: 400 })

    const admins = await supabaseAdmin<Array<{ id: string; password_hash: string; is_active?: boolean }>>(
      `admins?select=id,password_hash,is_active&id=eq.${encodeURIComponent(parsed.adminId)}&limit=1`,
    )
    const admin = admins[0]
    if (!admin || admin.is_active === false || admin.password_hash !== parsed.passwordHash) {
      return NextResponse.json({ error: 'This reset link is invalid or has already been used.' }, { status: 400 })
    }

    const updated = await supabaseAdmin<Array<{ id: string }>>(`admins?id=eq.${encodeURIComponent(parsed.adminId)}`, {
      method: 'PATCH',
      body: JSON.stringify({ password_hash: hashPassword(newPassword) }),
    })
    if (!updated.length) throw new Error('Password was not updated.')

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Password reset confirmation error:', error)
    return NextResponse.json({ error: 'Unable to reset the password.' }, { status: 500 })
  }
}
