'use client'

import { useEffect, useState } from 'react'
import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Package,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react'

const tabs = ['Dashboard', 'Books', 'Images', 'Orders', 'Content'] as const

type Book = {
  id: string
  title: string
  author: string | null
  description: string | null
  price: number
  currency: string
  cover_url: string | null
  gallery_urls: string[]
  published: boolean
}

type Order = {
  id: string
  order_number: string
  amount: number
  payment_status: string
  order_status: string
  created_at: string
  customers?: { name: string; email: string; phone: string } | null
  books?: { title: string } | null
}

type GalleryItem = { src: string; alt: string; span: string }

const emptyBook = {
  title: '',
  author: '',
  description: '',
  price: '',
  currency: 'RWF',
  cover_url: '',
  gallery_urls: [] as string[],
  published: true,
}

export default function AdminPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Dashboard')
  const [books, setBooks] = useState<Book[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [book, setBook] = useState(emptyBook)
  const [editing, setEditing] = useState<string | null>(null)

  async function load() {
    const [b, o] = await Promise.all([
      fetch('/api/admin/books'),
      fetch('/api/admin/orders'),
    ])
    if (b.ok) setBooks((await b.json()).books || [])
    if (o.ok) setOrders((await o.json()).orders || [])
  }

  useEffect(() => {
    load()
  }, [])

  async function upload(file: File, gallery = false) {
    setUploading(true)
    setMessage('')
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
    const data = await res.json()
    setUploading(false)
    if (!res.ok) {
      setMessage(data.error || 'Upload failed')
      return
    }
    if (gallery) {
      setBook((v) => ({ ...v, gallery_urls: [...v.gallery_urls, data.url] }))
    } else {
      setBook((v) => ({ ...v, cover_url: data.url }))
    }
    setMessage('Image uploaded successfully.')
  }

  async function saveBook(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    const payload = {
      ...book,
      price: Number(book.price),
      gallery_urls: book.gallery_urls,
    }
    const url = editing ? `/api/admin/books/${editing}` : '/api/admin/books'
    const res = await fetch(url, {
      method: editing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) {
      setMessage(data.error || 'Could not save book')
      return
    }
    setMessage(editing ? 'Book updated successfully.' : 'Book published successfully.')
    setBook(emptyBook)
    setEditing(null)
    load()
  }

  function editBook(b: Book) {
    setEditing(b.id)
    setTab('Books')
    setBook({
      title: b.title,
      author: b.author || '',
      description: b.description || '',
      price: String(b.price),
      currency: b.currency || 'RWF',
      cover_url: b.cover_url || '',
      gallery_urls: Array.isArray(b.gallery_urls) ? b.gallery_urls : [],
      published: b.published,
    })
  }

  async function deleteBook(id: string) {
    if (!confirm('Delete this book?')) return
    const res = await fetch(`/api/admin/books/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setMessage('Book deleted.')
      load()
    } else {
      setMessage('Could not delete book.')
    }
  }

  const paid = orders.filter((o) => o.payment_status === 'COMPLETED')
  const published = books.filter((b) => b.published)

  return (
    <main className="min-h-screen bg-[#f6f8f7] text-[#10251b]">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#103d2b] text-white shadow-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-[#103d2b]">Sage Publishers</div>
              <div className="text-xs font-medium text-slate-500">Management Portal</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:flex">
              <ExternalLink className="h-4 w-4" />
              View website
            </a>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7f1eb] text-sm font-bold text-[#14532d]">SA</div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px] gap-7 px-4 py-6 lg:px-8 lg:py-8">
        <aside className="hidden w-[235px] shrink-0 lg:block">
          <div className="sticky top-[100px] rounded-3xl border border-[#103d2b] bg-[#103d2b] p-3 shadow-lg shadow-[#103d2b]/15">
            <div className="px-3 pb-3 pt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">Workspace</div>
            {tabs.map((t) => (
              <NavButton key={t} active={tab === t} label={t} onClick={() => setTab(t)} />
            ))}
            <div className="my-3 border-t border-white/10" />
            <div className="px-3 py-2 text-xs text-white/55">Sage Publishers Ltd.</div>
            <button type="button" className="mt-2 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm lg:hidden">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold ${tab === t ? 'bg-[#103d2b] text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-2 text-sm font-semibold text-[#5b806b]">Sage Publishers / {tab}</div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {tab === 'Dashboard' ? 'Good day, Administrator.' : tab}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                {tab === 'Dashboard' ? 'Here is an overview of your publishing business.' : 'Manage your Sage Publishers content and operations.'}
              </p>
            </div>
            {tab === 'Books' && (
              <button onClick={() => { setEditing(null); setBook(emptyBook) }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#103d2b] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#14532d]">
                <Plus className="h-4 w-4" />
                Add new book
              </button>
            )}
          </div>

          {message && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
              <CheckCircle2 className="h-5 w-5" />
              {message}
            </div>
          )}

          {tab === 'Dashboard' && <Dashboard books={books} orders={orders} paid={paid.length} published={published.length} onBooks={() => setTab('Books')} onOrders={() => setTab('Orders')} />}
          {tab === 'Books' && <BooksTab books={books} book={book} setBook={setBook} editing={editing} setEditing={setEditing} saveBook={saveBook} upload={upload} uploading={uploading} editBook={editBook} deleteBook={deleteBook} />}
          {tab === 'Images' && <ImagesTab />}
          {tab === 'Orders' && <OrdersTab orders={orders} />}
          {tab === 'Content' && <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><h2 className="text-xl font-bold">Website content</h2><p className="mt-2 text-sm text-slate-500">Manage homepage text and images from this workspace.</p></div>}
        </div>
      </div>
    </main>
  )
}

function NavButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  const icons = { Dashboard: LayoutDashboard, Books: BookOpen, Images: ImageIcon, Orders: ClipboardList, Content: Package }
  const Icon = icons[label as keyof typeof icons]
  return (
    <button onClick={onClick} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition ${active ? 'bg-[#103d2b] text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}

function Dashboard({ books, orders, paid, published, onBooks, onOrders }: { books: Book[]; orders: Order[]; paid: number; published: number; onBooks: () => void; onOrders: () => void }) {
  const revenue = orders.filter((o) => o.payment_status === 'COMPLETED').reduce((sum, o) => sum + Number(o.amount || 0), 0)
  return (
    <div className="space-y-7">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={BookOpen} label="Total books" value={books.length.toString()} detail={`${published} published`} onClick={onBooks} />
        <StatCard icon={ClipboardList} label="Total orders" value={orders.length.toString()} detail={`${paid} paid`} onClick={onOrders} />
        <StatCard icon={CheckCircle2} label="Paid orders" value={paid.toString()} detail="Completed payments" onClick={onOrders} />
        <StatCard icon={Package} label="Revenue" value={`${revenue.toLocaleString()} RWF`} detail="From completed orders" onClick={onOrders} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Books</h2>
              <p className="mt-1 text-sm text-slate-500">Your current catalogue.</p>
            </div>
            <button onClick={onBooks} className="text-sm font-bold text-[#14532d] hover:underline">Manage books →</button>
          </div>
          <div className="mt-5 space-y-2">
            {books.slice(0, 5).map((b) => (
              <div key={b.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 p-3">
                <div className="h-14 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  {b.cover_url && <img src={b.cover_url} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-slate-900">{b.title}</div>
                  <div className="text-xs text-slate-500">{b.author || 'No author'}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{Number(b.price).toLocaleString()} {b.currency}</div>
                  <div className={`text-xs font-semibold ${b.published ? 'text-emerald-600' : 'text-slate-400'}`}>{b.published ? 'Published' : 'Hidden'}</div>
                </div>
              </div>
            ))}
            {books.length === 0 && <div className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500">No books added yet.</div>}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-[#103d2b] p-6 text-white shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10"><ClipboardList className="h-5 w-5" /></div>
          <h2 className="mt-5 text-xl font-bold">Recent activity</h2>
          <p className="mt-2 text-sm leading-6 text-white/70">Stay on top of your latest customer orders and payment activity.</p>
          <button onClick={onOrders} className="mt-6 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#103d2b]">View orders</button>
        </section>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, detail, onClick }: { icon: any; label: string; value: string; detail: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="group w-full rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#b8d9c7] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#14532d]/25">
      <div className="flex items-start justify-between">
        <div className="rounded-2xl bg-[#e7f1eb] p-3 text-[#14532d]"><Icon className="h-5 w-5" /></div>
        <span className="text-xs font-bold text-[#14532d] opacity-0 transition-opacity group-hover:opacity-100">Open →</span>
      </div>
      <div className="mt-5 text-sm font-medium text-slate-500">{label}</div>
      <div className="mt-1 truncate text-2xl font-bold tracking-tight text-slate-900">{value}</div>
      <div className="mt-1 text-xs text-slate-400">{detail}</div>
    </button>
  )
}

function ImagesTab() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  async function loadGallery() {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/gallery', { cache: 'no-store' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to load gallery.')
      setItems(Array.isArray(data.items) ? data.items : [])
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load gallery.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGallery()
  }, [])

  async function uploadImage(file: File, replaceIndex?: number) {
    setBusy(true)
    setMessage('')
    try {
      const form = new FormData()
      form.append('file', file)
      const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: form })
      const uploadData = await uploadRes.json()
      if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed.')

      const next = [...items]
      const newItem: GalleryItem = {
        src: uploadData.url,
        alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' '),
        span: replaceIndex !== undefined ? (items[replaceIndex]?.span || '') : '',
      }
      if (replaceIndex !== undefined) next[replaceIndex] = newItem
      else next.push(newItem)

      const saveRes = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: next }),
      })
      const saveData = await saveRes.json()
      if (!saveRes.ok) throw new Error(saveData.error || 'Could not save gallery.')

      setItems(next)
      setMessage(replaceIndex !== undefined ? 'Image replaced successfully.' : 'Image added successfully.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Image update failed.')
    } finally {
      setBusy(false)
    }
  }

  async function removeImage(index: number) {
    if (!confirm('Remove this image from the website gallery?')) return
    setBusy(true)
    setMessage('')
    try {
      const next = items.filter((_, i) => i !== index)
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: next }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not save gallery.')
      setItems(next)
      setMessage('Image removed successfully.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not remove image.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-[#e7f1eb] p-3 text-[#14532d]"><ImageIcon className="h-6 w-6" /></div>
          <div><h2 className="text-xl font-bold">Website Gallery</h2><p className="text-sm text-slate-500">See, add, replace, or remove images shown on the public website.</p></div>
        </div>
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#103d2b] px-5 py-3 text-sm font-bold text-white hover:bg-[#14532d]">
          <Upload className="h-4 w-4" />
          {busy ? 'Working…' : 'Add image'}
          <input type="file" accept="image/*" className="hidden" disabled={busy} onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadImage(file); e.currentTarget.value = '' }} />
        </label>
      </div>

      {message && <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">{message}</div>}

      {loading ? (
        <div className="mt-7 rounded-2xl bg-slate-50 p-10 text-center text-sm text-slate-500">Loading current gallery images…</div>
      ) : items.length === 0 ? (
        <div className="mt-7 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">No gallery images found. Add an image to start the website gallery.</div>
      ) : (
        <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
          {items.map((item, index) => (
            <div key={`${item.src}-${index}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-square bg-slate-100">
                <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <div className="truncate text-xs font-semibold text-slate-700">{item.alt || `Gallery image ${index + 1}`}</div>
                <div className="mt-3 flex gap-2">
                  <label className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#103d2b] px-2 py-2 text-xs font-bold text-white hover:bg-[#14532d]">
                    <Upload className="h-3.5 w-3.5" /> Replace
                    <input type="file" accept="image/*" className="hidden" disabled={busy} onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadImage(file, index); e.currentTarget.value = '' }} />
                  </label>
                  <button type="button" onClick={() => removeImage(index)} disabled={busy} className="inline-flex items-center justify-center rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 disabled:opacity-50" title="Delete image">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function OrdersTab({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5"><h2 className="font-bold text-slate-900">Customer orders</h2><p className="mt-1 text-sm text-slate-500">Review payments and order status.</p></div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-6 py-4">Order</th><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Book</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Payment</th></tr></thead>
          <tbody>{orders.map((o) => <tr key={o.id} className="border-t border-slate-100"><td className="px-6 py-4 font-bold">{o.order_number}</td><td className="px-6 py-4">{o.customers?.name}<br /><span className="text-xs text-slate-400">{o.customers?.email}</span></td><td className="px-6 py-4">{o.books?.title || '—'}</td><td className="px-6 py-4 font-bold">{Number(o.amount).toLocaleString()} RWF</td><td className="px-6 py-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{o.payment_status}</span></td></tr>)}</tbody>
        </table>
      </div>
      {orders.length === 0 && <div className="p-10 text-center text-sm text-slate-500">No orders yet.</div>}
    </div>
  )
}

function BooksTab({ books, book, setBook, editing, setEditing, saveBook, upload, uploading, editBook, deleteBook }: { books: Book[]; book: any; setBook: any; editing: string | null; setEditing: (v: string | null) => void; saveBook: (e: React.FormEvent) => void; upload: (f: File, gallery?: boolean) => void; uploading: boolean; editBook: (b: Book) => void; deleteBook: (id: string) => void }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <form onSubmit={saveBook} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between"><div><h2 className="text-xl font-bold">{editing ? 'Edit book' : 'Add a book'}</h2><p className="mt-1 text-sm text-slate-500">Manage catalogue details.</p></div>{editing && <button type="button" onClick={() => { setEditing(null); setBook(emptyBook) }} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X className="h-4 w-4" /></button>}</div>
        <Input label="Book title" value={book.title} onChange={(v) => setBook({ ...book, title: v })} />
        <Input label="Author" value={book.author} onChange={(v) => setBook({ ...book, author: v })} />
        <div className="grid grid-cols-2 gap-3"><Input label="Price" type="number" value={book.price} onChange={(v) => setBook({ ...book, price: v })} /><Input label="Currency" value={book.currency} onChange={(v) => setBook({ ...book, currency: v.toUpperCase() })} /></div>
        <label className="block text-sm font-semibold text-slate-700">Description<textarea value={book.description} onChange={(e) => setBook({ ...book, description: e.target.value })} className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none focus:border-[#5b806b]" /></label>
        <ImageField label="Cover image" url={book.cover_url} uploading={uploading} onFile={(f) => upload(f, false)} />
        <div><label className="mb-2 block text-sm font-semibold text-slate-700">Gallery images</label><input type="file" accept="image/*" multiple disabled={uploading} onChange={(e) => { for (const f of Array.from(e.target.files || [])) upload(f, true); e.currentTarget.value = '' }} /><div className="mt-3 flex flex-wrap gap-2">{book.gallery_urls.map((u: string, i: number) => <div key={u} className="relative"><img src={u} alt="" className="h-20 w-16 rounded-lg object-cover" /><button type="button" onClick={() => setBook((v: any) => ({ ...v, gallery_urls: v.gallery_urls.filter((_: string, n: number) => n !== i) }))} className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white"><X className="h-3 w-3" /></button></div>)}</div></div>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700"><input type="checkbox" checked={book.published} onChange={(e) => setBook({ ...book, published: e.target.checked })} /> Publish this book on the website</label>
        <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#103d2b] py-3.5 font-bold text-white hover:bg-[#14532d]">{editing ? <><Pencil className="h-4 w-4" />Save changes</> : <><Plus className="h-4 w-4" />Add book</>}</button>
      </form>
      <div className="space-y-3">
        {books.map((b) => <div key={b.id} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"><div className="h-20 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">{b.cover_url && <img src={b.cover_url} alt="" className="h-full w-full object-cover" />}</div><div className="min-w-0 flex-1"><div className="truncate font-bold text-slate-900">{b.title}</div><div className="text-sm text-slate-500">{b.author || 'No author'}</div><div className="mt-1 text-sm font-bold text-slate-800">{Number(b.price).toLocaleString()} {b.currency}</div></div><span className={`hidden rounded-full px-3 py-1 text-xs font-bold sm:block ${b.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{b.published ? 'Published' : 'Hidden'}</span><button onClick={() => editBook(b)} className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"><Pencil className="h-4 w-4" /></button><button onClick={() => deleteBook(b.id)} className="rounded-xl bg-red-50 p-2.5 text-red-600 hover:bg-red-100"><Trash2 className="h-4 w-4" /></button></div>)}
        {books.length === 0 && <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">No books yet. Add your first book.</div>}
      </div>
    </div>
  )
}

function Input({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return <label className="mb-4 block text-sm font-semibold text-slate-700">{label}<input type={type} value={value} onChange={(e) => onChange(e.target.value)} required className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-[#5b806b] focus:bg-white focus:ring-2 focus:ring-[#5b806b]/10" /></label>
}

function ImageField({ label, url, uploading, onFile }: { label: string; url: string; uploading: boolean; onFile: (f: File) => void }) {
  return <div><label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label><input type="file" accept="image/*" disabled={uploading} onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} className="w-full text-sm text-slate-500" />{url && <img src={url} alt="Cover preview" className="mt-4 h-44 w-32 rounded-xl border border-slate-200 object-cover" />}</div>
}
