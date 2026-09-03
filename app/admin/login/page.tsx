'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      router.push('/admin')
    } catch (e) { setError(e instanceof Error ? e.message : 'Login failed') }
    finally { setLoading(false) }
  }

  return <main className="min-h-screen bg-[#f5f7f6] flex items-center justify-center px-5">
    <form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-black/5">
      <div className="mb-8"><div className="text-2xl font-bold text-[#14532d]">Sage Publishers</div><p className="mt-2 text-sm text-gray-500">Administrator access</p></div>
      <label className="block text-sm font-semibold mb-2">Email</label>
      <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required className="w-full rounded-xl border px-4 py-3 mb-5 outline-none focus:ring-2 focus:ring-emerald-600/20" />
      <label className="block text-sm font-semibold mb-2">Password</label>
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required className="w-full rounded-xl border px-4 py-3 mb-2 outline-none focus:ring-2 focus:ring-emerald-600/20" />
      <div className="mb-5 text-right"><button type="button" onClick={() => router.push('/admin/forgot-password')} className="text-sm font-semibold text-[#14532d] hover:underline">Forgot password?</button></div>
      {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <button disabled={loading} className="w-full rounded-xl bg-[#14532d] px-4 py-3 font-semibold text-white disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in'}</button>
    </form>
  </main>
}
