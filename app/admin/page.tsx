'use client'

import { useEffect, useState } from 'react'

const tabs = ['Dashboard', 'Books', 'Images', 'Orders', 'Content'] as const
type Book = { id:string; title:string; author:string|null; description:string|null; price:number; currency:string; cover_url:string|null; gallery_urls:string[]; published:boolean }
type Order = { id:string; order_number:string; amount:number; payment_status:string; order_status:string; created_at:string; customers?:{name:string;email:string;phone:string}|null; books?:{title:string}|null }
const emptyBook = { title:'', author:'', description:'', price:'', currency:'RWF', cover_url:'', gallery_urls:[] as string[], published:true }

export default function AdminPage() {
  const [tab,setTab]=useState<(typeof tabs)[number]>('Dashboard')
  const [books,setBooks]=useState<Book[]>([])
  const [orders,setOrders]=useState<Order[]>([])
  const [message,setMessage]=useState('')
  const [uploading,setUploading]=useState(false)
  const [book,setBook]=useState(emptyBook)
  const [editing,setEditing]=useState<string|null>(null)

  async function load(){
    const [b,o]=await Promise.all([fetch('/api/admin/books'),fetch('/api/admin/orders')])
    if(b.ok)setBooks((await b.json()).books||[])
    if(o.ok)setOrders((await o.json()).orders||[])
  }
  useEffect(()=>{load()},[])

  async function upload(file:File, gallery=false){
    setUploading(true);setMessage('')
    const form=new FormData();form.append('file',file)
    const res=await fetch('/api/admin/upload',{method:'POST',body:form});const data=await res.json();setUploading(false)
    if(!res.ok){setMessage(data.error||'Upload failed');return}
    if(gallery)setBook(v=>({...v,gallery_urls:[...v.gallery_urls,data.url]}));else setBook(v=>({...v,cover_url:data.url}))
    setMessage('Image uploaded successfully.')
  }

  async function saveBook(e:React.FormEvent){
    e.preventDefault();setMessage('')
    const payload={...book,price:Number(book.price),gallery_urls:book.gallery_urls}
    const url=editing?`/api/admin/books/${editing}`:'/api/admin/books'
    const res=await fetch(url,{method:editing?'PATCH':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
    const data=await res.json()
    if(!res.ok){setMessage(data.error||'Could not save book');return}
    setMessage(editing?'Book updated successfully.':'Book published successfully.');setBook(emptyBook);setEditing(null);load()
  }

  function editBook(b:Book){setEditing(b.id);setBook({title:b.title,author:b.author||'',description:b.description||'',price:String(b.price),currency:b.currency||'RWF',cover_url:b.cover_url||'',gallery_urls:Array.isArray(b.gallery_urls)?b.gallery_urls:[],published:b.published})}
  async function deleteBook(id:string){if(!confirm('Delete this book?'))return;const res=await fetch(`/api/admin/books/${id}`,{method:'DELETE'});if(res.ok){setMessage('Book deleted.');load()}else setMessage('Could not delete book.')}

  return <main className="min-h-screen bg-[#f5f7f6] text-[#10251b]">
    <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur px-6 py-4 flex items-center justify-between"><div><div className="text-xl font-bold text-[#14532d]">Sage Publishers</div><div className="text-xs text-gray-500">Admin dashboard</div></div><a href="/" className="text-sm font-semibold text-[#14532d]">View website →</a></header>
    <div className="mx-auto max-w-7xl px-5 py-8 grid gap-8 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-2xl bg-[#103d2b] p-3 text-white h-fit">{tabs.map(t=><button key={t} onClick={()=>setTab(t)} className={`w-full text-left rounded-xl px-4 py-3 text-sm font-semibold ${tab===t?'bg-white/15':'hover:bg-white/10'}`}>{t}</button>)}</aside>
      <section><h1 className="text-3xl font-bold">{tab}</h1>{message&&<div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</div>}
        {tab==='Dashboard'&&<div className="mt-7 grid gap-4 sm:grid-cols-3"><Stat label="Books" value={books.length}/><Stat label="Orders" value={orders.length}/><Stat label="Paid orders" value={orders.filter(o=>o.payment_status==='COMPLETED').length}/></div>}
        {tab==='Books'&&<div className="mt-7 grid gap-6 xl:grid-cols-[minmax(360px,1fr)_minmax(420px,1.2fr)]">
          <form onSubmit={saveBook} className="rounded-2xl bg-white p-6 border shadow-sm space-y-4"><div className="flex justify-between"><h2 className="text-xl font-bold">{editing?'Edit book':'Add a book'}</h2>{editing&&<button type="button" onClick={()=>{setEditing(null);setBook(emptyBook)}} className="text-sm text-gray-500">Cancel</button>}</div>
            <Input label="Book title" value={book.title} onChange={v=>setBook({...book,title:v})}/><Input label="Author" value={book.author} onChange={v=>setBook({...book,author:v})}/>
            <div className="grid grid-cols-2 gap-3"><Input label="Price" type="number" value={book.price} onChange={v=>setBook({...book,price:v})}/><Input label="Currency" value={book.currency} onChange={v=>setBook({...book,currency:v.toUpperCase()})}/></div>
            <label className="block text-sm font-semibold">Description<textarea value={book.description} onChange={e=>setBook({...book,description:e.target.value})} className="mt-2 w-full rounded-xl border p-3 min-h-28"/></label>
            <ImageField label="Cover image" url={book.cover_url} uploading={uploading} onFile={f=>upload(f,false)} />
            <div><label className="block text-sm font-semibold mb-2">Gallery images</label><input type="file" accept="image/*" multiple disabled={uploading} onChange={e=>{for(const f of Array.from(e.target.files||[]))upload(f,true);e.currentTarget.value=''}}/><div className="mt-3 flex flex-wrap gap-2">{book.gallery_urls.map((u,i)=><div key={u} className="relative"><img src={u} alt="" className="h-20 w-16 object-cover rounded"/><button type="button" onClick={()=>setBook(v=>({...v,gallery_urls:v.gallery_urls.filter((_,n)=>n!==i)}))} className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-600 text-white text-xs">×</button></div>)}</div></div>
            <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={book.published} onChange={e=>setBook({...book,published:e.target.checked})}/> Publish this book on the website</label>
            <button className="w-full rounded-xl bg-[#14532d] py-3 font-semibold text-white">{editing?'Save changes':'Publish book'}</button>
          </form>
          <div className="space-y-3">{books.map(b=><div key={b.id} className="rounded-2xl bg-white border p-4 flex gap-4 items-center">{b.cover_url?<img src={b.cover_url} alt="" className="h-24 w-16 object-cover rounded"/>:<div className="h-24 w-16 rounded bg-gray-100"/>}<div className="min-w-0 flex-1"><div className="font-bold truncate">{b.title}</div><div className="text-sm text-gray-500">{b.author||'No author'}</div><div className="mt-1 font-semibold">{Number(b.price).toLocaleString()} {b.currency}</div><div className="text-xs mt-1">{b.published?'Published':'Hidden'}</div></div><div className="flex gap-2"><button onClick={()=>editBook(b)} className="rounded-lg border px-3 py-2 text-sm font-semibold">Edit</button><button onClick={()=>deleteBook(b.id)} className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">Delete</button></div></div>)}{books.length===0&&<div className="rounded-2xl bg-white border p-8 text-gray-500">No books yet. Add your first book on the left.</div>}</div>
        </div>}
        {tab==='Images'&&<div className="mt-7 rounded-2xl bg-white border p-7"><h2 className="text-xl font-bold">Media library</h2><p className="mt-2 text-gray-500">Upload book covers and other website images directly from your computer.</p><label className="mt-6 inline-flex cursor-pointer rounded-xl bg-[#14532d] px-5 py-3 font-semibold text-white">{uploading?'Uploading…':'Upload image'}<input className="hidden" type="file" accept="image/*" multiple onChange={e=>{for(const f of Array.from(e.target.files||[]))upload(f,true);e.currentTarget.value=''}}/></label></div>}
        {tab==='Orders'&&<div className="mt-7 overflow-x-auto rounded-2xl bg-white border"><table className="w-full text-left text-sm"><thead className="border-b bg-gray-50"><tr><th className="p-4">Order</th><th className="p-4">Customer</th><th className="p-4">Book</th><th className="p-4">Amount</th><th className="p-4">Payment</th></tr></thead><tbody>{orders.map(o=><tr key={o.id} className="border-b last:border-0"><td className="p-4 font-semibold">{o.order_number}</td><td className="p-4">{o.customers?.name}<br/><span className="text-gray-500">{o.customers?.email}</span></td><td className="p-4">{o.books?.title||'—'}</td><td className="p-4">{Number(o.amount).toLocaleString()} RWF</td><td className="p-4">{o.payment_status}</td></tr>)}</tbody></table></div>}
        {tab==='Content'&&<div className="mt-7 rounded-2xl bg-white border p-7"><h2 className="text-xl font-bold">Website content</h2><p className="mt-2 text-gray-500">This area will control homepage text and images. The book system is already connected to the database.</p></div>}
      </section>
    </div>
  </main>
}
function Input({label,value,onChange,type='text'}:{label:string;value:string;onChange:(v:string)=>void;type?:string}){return <label className="block text-sm font-semibold">{label}<input type={type} value={value} onChange={e=>onChange(e.target.value)} required className="mt-2 w-full rounded-xl border p-3"/></label>}
function ImageField({label,url,uploading,onFile}:{label:string;url:string;uploading:boolean;onFile:(f:File)=>void}){return <div><label className="block text-sm font-semibold mb-2">{label}</label><input type="file" accept="image/*" disabled={uploading} onChange={e=>e.target.files?.[0]&&onFile(e.target.files[0])}/>{url&&<img src={url} alt="Cover preview" className="mt-4 h-44 w-32 object-cover rounded-lg border"/>}</div>}
function Stat({label,value}:{label:string;value:number}){return <div className="rounded-2xl bg-white border p-6"><div className="text-sm text-gray-500">{label}</div><div className="mt-2 text-3xl font-bold">{value}</div></div>}
