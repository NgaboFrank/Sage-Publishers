'use client'

import { useEffect, useState } from 'react'

const tabs = ['Dashboard', 'Books', 'Images', 'Orders', 'Content'] as const

type Book = { id: string; title: string; author: string | null; price: number; cover_url: string | null; published: boolean }
type Order = { id: string; order_number: string; amount: number; payment_status: string; order_status: string; created_at: string; customers?: {name:string;email:string;phone:string} | null; books?: {title:string} | null }

export default function AdminPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Dashboard')
  const [books, setBooks] = useState<Book[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [book, setBook] = useState({ title: '', author: '', description: '', price: '', cover_url: '' })

  async function load() {
    const [b, o] = await Promise.all([fetch('/api/admin/books'), fetch('/api/admin/orders')])
    if (b.ok) setBooks((await b.json()).books || [])
    if (o.ok) setOrders((await o.json()).orders || [])
  }
  useEffect(() => { load() }, [])

  async function upload(file: File) {
    setUploading(true); setMessage('')
    const form = new FormData(); form.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    const data = await res.json(); setUploading(false)
    if (!res.ok) { setMessage(data.error || 'Upload failed'); return }
    setBook(v => ({ ...v, cover_url: data.url })); setMessage('Image uploaded successfully.')
  }

  async function addBook(e: React.FormEvent) {
    e.preventDefault(); setMessage('')
    const res = await fetch('/api/admin/books', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ ...book, price: Number(book.price) }) })
    const data = await res.json()
    if (!res.ok) { setMessage(data.error || 'Could not add book'); return }
    setBook({ title:'', author:'', description:'', price:'', cover_url:'' }); setMessage('Book published successfully.'); load()
  }

  return <main className="min-h-screen bg-[#f5f7f6] text-[#10251b]">
    <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur px-6 py-4 flex items-center justify-between">
      <div><div className="text-xl font-bold text-[#14532d]">Sage Publishers</div><div className="text-xs text-gray-500">Admin dashboard</div></div>
      <a href="/" className="text-sm font-semibold text-[#14532d]">View website →</a>
    </header>
    <div className="mx-auto max-w-7xl px-5 py-8 grid gap-8 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-2xl bg-[#103d2b] p-3 text-white h-fit">{tabs.map(t => <button key={t} onClick={()=>setTab(t)} className={`w-full text-left rounded-xl px-4 py-3 text-sm font-semibold ${tab===t?'bg-white/15':'hover:bg-white/10'}`}>{t}</button>)}</aside>
      <section>
        <h1 className="text-3xl font-bold">{tab}</h1>
        {message && <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</div>}

        {tab==='Dashboard' && <div className="mt-7 grid gap-4 sm:grid-cols-3"><Stat label="Books" value={books.length}/><Stat label="Orders" value={orders.length}/><Stat label="Paid orders" value={orders.filter(o=>o.payment_status==='COMPLETED').length}/></div>}

        {tab==='Books' && <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <form onSubmit={addBook} className="rounded-2xl bg-white p-6 border shadow-sm space-y-4"><h2 className="text-xl font-bold">Add a book</h2><Input label="Title" value={book.title} onChange={v=>setBook({...book,title:v})}/><Input label="Author" value={book.author} onChange={v=>setBook({...book,author:v})}/><Input label="Price (RWF)" type="number" value={book.price} onChange={v=>setBook({...book,price:v})}/><label className="block text-sm font-semibold">Description<textarea value={book.description} onChange={e=>setBook({...book,description:e.target.value})} className="mt-2 w-full rounded-xl border p-3 min-h-28"/></label><div><label className="block text-sm font-semibold mb-2">Cover image</label><input type="file" accept="image/*" disabled={uploading} onChange={e=>e.target.files?.[0]&&upload(e.target.files[0])}/>{book.cover_url&&<img src={book.cover_url} alt="Uploaded cover" className="mt-4 h-40 w-28 object-cover rounded-lg"/>}</div><button className="w-full rounded-xl bg-[#14532d] py-3 font-semibold text-white">Publish book</button></form>
          <div className="space-y-3">{books.map(b=><div key={b.id} className="rounded-2xl bg-white border p-4 flex gap-4 items-center">{b.cover_url?<img src={b.cover_url} alt="" className="h-24 w-16 object-cover rounded"/>:<div className="h-24 w-16 rounded bg-gray-100"/>}<div><div className="font-bold">{b.title}</div><div className="text-sm text-gray-500">{b.author}</div><div className="mt-1 font-semibold">{Number(b.price).toLocaleString()} RWF</div></div></div>)}</div>
        </div>}

        {tab==='Images' && <div className="mt-7 rounded-2xl bg-white border p-7"><h2 className="text-xl font-bold">Media library</h2><p className="mt-2 text-gray-500">Upload images from your computer. Uploaded files are stored in Supabase Storage and can be used as book covers or website media.</p><label className="mt-6 inline-flex cursor-pointer rounded-xl bg-[#14532d] px-5 py-3 font-semibold text-white">{uploading?'Uploading…':'Upload image'}<input className="hidden" type="file" accept="image/*" onChange={e=>e.target.files?.[0]&&upload(e.target.files[0])}/></label>{book.cover_url&&<div className="mt-6"><img src={book.cover_url} alt="Latest upload" className="max-h-64 rounded-xl"/></div>}</div>}

        {tab==='Orders' && <div className="mt-7 overflow-x-auto rounded-2xl bg-white border"><table className="w-full text-left text-sm"><thead className="border-b bg-gray-50"><tr><th className="p-4">Order</th><th className="p-4">Customer</th><th className="p-4">Book</th><th className="p-4">Amount</th><th className="p-4">Payment</th></tr></thead><tbody>{orders.map(o=><tr key={o.id} className="border-b last:border-0"><td className="p-4 font-semibold">{o.order_number}</td><td className="p-4">{o.customers?.name}<br/><span className="text-gray-500">{o.customers?.email}</span></td><td className="p-4">{o.books?.title || '—'}</td><td className="p-4">{Number(o.amount).toLocaleString()} RWF</td><td className="p-4">{o.payment_status}</td></tr>)}</tbody></table></div>}

        {tab==='Content' && <div className="mt-7 rounded-2xl bg-white border p-7"><h2 className="text-xl font-bold">Website content</h2><p className="mt-2 text-gray-500">The content API is ready for homepage/about text and image fields. We can connect each existing section to these editable values without changing the current design.</p></div>}
      </section>
    </div>
  </main>
}

function Input({label,value,onChange,type='text'}:{label:string;value:string;onChange:(v:string)=>void;type?:string}) { return <label className="block text-sm font-semibold">{label}<input type={type} value={value} onChange={e=>onChange(e.target.value)} required className="mt-2 w-full rounded-xl border p-3"/></label> }
function Stat({label,value}:{label:string;value:number}) { return <div className="rounded-2xl bg-white border p-6"><div className="text-sm text-gray-500">{label}</div><div className="mt-2 text-3xl font-bold">{value}</div></div> }
