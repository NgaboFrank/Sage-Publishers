'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setMessage(''); setLoading(true)
    try {
      const res = await fetch('/api/admin/password-reset/request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to send the reset email.')
      setMessage('If that email belongs to an active administrator, a reset link has been sent. Check the inbox and spam folder.')
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to send the reset email.') }
    finally { setLoading(false) }
  }

  return <main className="min-h-screen bg-[#f5f7f6] flex items-center justify-center px-5">
    <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-black/5">
      <div className="mb-8"><div className="text-2xl font-bold text-[#14532d]">Sage Publishers</div><h1 className="mt-6 text-xl font-bold text-gray-900">Reset your admin password</h1><p className="mt-2 text-sm text-gray-500">Enter your administrator email and we’ll send you a secure reset link.</p></div>
      <label className="block text-sm font-semibold mb-2">Admin email</label>
      <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required className="w-full rounded-xl border px-4 py-3 mb-5 outline-none focus:ring-2 focus:ring-emerald-600/20" />
      {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {message && <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p>}
      <button disabled={loading} className="w-full rounded-xl bg-[#14532d] px-4 py-3 font-semibold text-white disabled:opacity-60">{loading ? 'Sending…' : 'Send reset link'}</button>
      <button type="button" onClick={() => router.push('/admin/login')} className="w-full mt-3 px-4 py-2 text-sm font-semibold text-[#14532d]">Back to sign in</button>
    </form>
  </main>
}
