import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../../lib/supabase-admin'
import { makePasswordResetToken } from '../../../../../lib/password-reset-token'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    const normalizedEmail = String(email || '').trim().toLowerCase()
    if (!normalizedEmail) return NextResponse.json({ error: 'Admin email is required.' }, { status: 400 })

    const admins = await supabaseAdmin<Array<{ id: string; email: string; name: string; password_hash: string; is_active?: boolean }>>(
      `admins?select=id,email,name,password_hash,is_active&email=eq.${encodeURIComponent(normalizedEmail)}&limit=1`,
    )
    const admin = admins[0]

    // Do not reveal whether an email belongs to an admin.
    if (!admin || admin.is_active === false) return NextResponse.json({ ok: true })

    const expiresAt = Date.now() + 30 * 60 * 1000
    const token = makePasswordResetToken(admin.id, admin.password_hash, expiresAt)
    const origin = new URL(request.url).origin
    const resetUrl = `${origin}/admin/reset-password?token=${encodeURIComponent(token)}`

    const apiKey = process.env.RESEND_API_KEY?.trim()
    // If PASSWORD_RESET_FROM contains an email address, use it. Otherwise keep
    // the Resend onboarding sender that already works before a custom domain is verified.
    const configuredFrom = process.env.PASSWORD_RESET_FROM?.trim() || ''
    const from = configuredFrom.includes('@') ? configuredFrom : 'KHMC <onboarding@resend.dev>'
    if (!apiKey) throw new Error('RESEND_API_KEY is not configured.')

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [admin.email],
        subject: 'Reset your Sage Publishers admin password',
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#222"><h2>Reset your admin password</h2><p>Hello ${admin.name || 'Administrator'},</p><p>Someone requested a password reset for your Sage Publishers admin account.</p><p><a href="${resetUrl}" style="display:inline-block;background:#14532d;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:600">Reset password</a></p><p>This link expires in 30 minutes and can only be used once.</p><p>If you did not request this, you can safely ignore this email.</p></div>`,
      }),
    })

    if (!emailResponse.ok) {
      const details = await emailResponse.text()
      console.error('Resend error:', details)
      throw new Error('Unable to send reset email.')
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Password reset request error:', error)
    return NextResponse.json({ error: 'Unable to send the reset email.' }, { status: 500 })
  }
}
