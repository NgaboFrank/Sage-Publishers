'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, CheckCircle2, CreditCard, Loader2, ShieldCheck } from 'lucide-react'

type Book = { id:string; title:string; author:string|null; price:number; currency:string; cover_url:string|null }

export default function PaymentPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [form, setForm] = useState({ name:'', email:'', phone:'', bookId:'', amount:'' })
  const [loading, setLoading] = useState(false)
  const [loadingBooks, setLoadingBooks] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/books').then(r => r.json()).then(data => setBooks(data.books || [])).catch(() => setError('Unable to load available books.')).finally(() => setLoadingBooks(false))
  }, [])

  function selectBook(id:string) {
    const book = books.find(b => b.id === id)
    setForm(current => ({ ...current, bookId:id, amount:book ? String(book.price) : '' }))
  }
  function updateField(field:string, value:string) { setForm(current => ({ ...current, [field]:value })) }

  async function handlePayment(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const response = await fetch('/api/pesapal/pay', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to start the payment.')
      if (!data.redirect_url) throw new Error('Pesapal did not return a payment URL.')
      window.location.href = data.redirect_url
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to start the payment.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,_rgba(82,200,120,0.10),_transparent_35%)] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8"><motion.button type="button" onClick={() => window.history.back()} disabled={loading} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-muted disabled:opacity-50"><ArrowLeft className="h-4 w-4" />Back</motion.button></div>
        <div className="mb-10 text-center md:mb-12">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald/15 text-emerald"><CreditCard className="h-8 w-8" /></div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">Secure Payment</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-forest sm:text-5xl">Pay for Your Order</h1>
          <div className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-2 text-xs text-muted-foreground"><span className="inline-flex items-center gap-1 rounded-full bg-emerald/10 px-3 py-1.5 text-forest"><CheckCircle2 className="h-3.5 w-3.5 text-emerald" /> Secure Pesapal checkout</span><span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-forest"><ShieldCheck className="h-3.5 w-3.5 text-emerald" /> Your details stay private</span></div>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">Choose your book, confirm the price, then continue to Pesapal to complete your payment securely.</p>
        </div>
        <form onSubmit={handlePayment} className="rounded-[2rem] border border-border bg-card/95 p-7 shadow-2xl shadow-forest/10 backdrop-blur md:p-10">
          <div className="space-y-6">
            <div className="flex flex-col gap-2"><label htmlFor="book" className="text-sm font-medium text-forest">Book</label><select id="book" required value={form.bookId} onChange={e=>selectBook(e.target.value)} disabled={loadingBooks || loading} className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/30"><option value="">{loadingBooks ? 'Loading books...' : 'Select a book'}</option>{books.map(book=><option key={book.id} value={book.id}>{book.title} — {Number(book.price).toLocaleString()} {book.currency}</option>)}</select></div>
            <div className="flex flex-col gap-2"><label htmlFor="name" className="text-sm font-medium text-forest">Full Name</label><input id="name" type="text" required value={form.name} onChange={e=>updateField('name',e.target.value)} placeholder="Your full name" className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/30" /></div>
            <div className="flex flex-col gap-2"><label htmlFor="email" className="text-sm font-medium text-forest">Email Address</label><input id="email" type="email" required value={form.email} onChange={e=>updateField('email',e.target.value)} placeholder="you@example.com" className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/30" /></div>
            <div className="flex flex-col gap-2"><label htmlFor="phone" className="text-sm font-medium text-forest">Phone Number</label><input id="phone" type="tel" required value={form.phone} onChange={e=>updateField('phone',e.target.value)} placeholder="+250 7XX XXX XXX" className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-emerald focus:ring-2 focus:ring-emerald/30" /></div>
            <div className="flex flex-col gap-2"><label htmlFor="amount" className="text-sm font-medium text-forest">Amount (RWF)</label><input id="amount" type="number" readOnly value={form.amount} placeholder="Select a book" className="rounded-xl border border-border bg-muted px-4 py-3 font-semibold text-foreground outline-none" /></div>
            {error && <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600">{error}</div>}
            <motion.button type="submit" disabled={loading || loadingBooks || !form.bookId} whileHover={loading ? undefined : {scale:1.02}} whileTap={loading ? undefined : {scale:0.98}} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-8 py-4 font-semibold text-forest-deep shadow-lg shadow-emerald/30 transition-opacity disabled:cursor-not-allowed disabled:opacity-70">{loading ? <><Loader2 className="h-5 w-5 animate-spin" />Connecting to Pesapal...</> : <><CreditCard className="h-5 w-5" />CONTINUE TO SECURE CHECKOUT</>}</motion.button>
            <div className="flex items-center justify-center gap-2 pt-2 text-sm text-muted-foreground"><ShieldCheck className="h-5 w-5 text-emerald" />Secure payment powered by Pesapal</div>
          </div>
        </form>
      </div>
    </main>
  )
}
