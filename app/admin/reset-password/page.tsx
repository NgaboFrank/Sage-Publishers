'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function ResetPasswordForm() {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setMessage('')
    if (password.length < 8) return setError('Use a password of at least 8 characters.')
    if (password !== confirm) return setError('The passwords do not match.')
    if (!token) return setError('This reset link is missing or invalid.')

    setLoading(true)
    try {
      const res = await fetch('/api/admin/password-reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to reset the password.')
      setMessage('Password changed successfully. You can now sign in.')
      setTimeout(() => router.push('/admin/login'), 1200)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to reset the password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7f6] flex items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-black/5">
        <div className="mb-8">
          <div className="text-2xl font-bold text-[#14532d]">Sage Publishers</div>
          <p className="mt-2 text-sm text-gray-500">Create a new administrator password</p>
        </div>
        {!token && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">This reset link is missing or invalid.</p>}
        <label className="block text-sm font-semibold mb-2">New password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" minLength={8} required disabled={!token} className="w-full rounded-xl border px-4 py-3 mb-5 outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:opacity-50" />
        <label className="block text-sm font-semibold mb-2">Confirm new password</label>
        <input value={confirm} onChange={e => setConfirm(e.target.value)} type="password" minLength={8} required disabled={!token} className="w-full rounded-xl border px-4 py-3 mb-5 outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:opacity-50" />
        {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {message && <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>}
        <button disabled={loading || !token} className="w-full rounded-xl bg-[#14532d] px-4 py-3 font-semibold text-white disabled:opacity-60">{loading ? 'Saving…' : 'Set new password'}</button>
        <button type="button" onClick={() => router.push('/admin/login')} className="w-full mt-3 px-4 py-2 text-sm font-semibold text-[#14532d]">Back to sign in</button>
      </form>
    </main>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f5f7f6]" />}>
      <ResetPasswordForm />
    </Suspense>
  )
}
