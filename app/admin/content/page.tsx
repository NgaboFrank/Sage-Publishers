'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, CheckCircle2, Plus, Save, Trash2 } from 'lucide-react'


type ContentItem = {
  id?: string
  content_key: string
  value: string
  image_url?: string | null
}

const starterKeys = [
  ['hero_title', 'Homepage hero title'],
  ['hero_description', 'Homepage hero description'],
  ['about_title', 'About section title'],
  ['about_description', 'About section text'],
  ['contact_phone', 'Contact phone'],
  ['contact_email', 'Contact email'],
]

export default function AdminContentPage() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [newKey, setNewKey] = useState('')

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/content', { cache: 'no-store' })
    const data = await res.json()
    if (!res.ok) {
      setMessage(data.error || 'Unable to load website content.')
      setLoading(false)
      return
    }

    const existing = (data.content || []) as ContentItem[]
    const byKey = new Map(existing.map((item) => [item.content_key, item]))
    const merged = starterKeys.map(([key]) => byKey.get(key) || { content_key: key, value: '', image_url: '' })
    const custom = existing.filter((item) => !starterKeys.some(([key]) => key === item.content_key))
    setItems([...merged, ...custom])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function update(index: number, patch: Partial<ContentItem>) {
    setItems((current) => current.map((item, i) => i === index ? { ...item, ...patch } : item))
  }

  async function save(item: ContentItem, index: number) {
    if (!item.content_key.trim()) return
    setSaving(item.content_key)
    setMessage('')
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
    const data = await res.json()
    setSaving(null)
    if (!res.ok) {
      setMessage(data.error || `Could not save ${item.content_key}.`)
      return
    }
    if (data.content) update(index, data.content)
    setMessage(`Saved ${item.content_key}.`)
  }

  function addContent() {
    const key = newKey.trim().toLowerCase().replace(/\s+/g, '_')
    if (!key || items.some((item) => item.content_key === key)) return
    setItems((current) => [...current, { content_key: key, value: '', image_url: '' }])
    setNewKey('')
  }

  function removeUnsaved(index: number) {
    if (items[index].id) return
    setItems((current) => current.filter((_, i) => i !== index))
  }

  return (
    <main className="min-h-screen bg-[#f6f8f7] text-[#10251b]">
      <div className="mx-auto max-w-[1100px] px-5 py-8 lg:px-8">
        <div className="mb-7 flex items-center gap-4">
          <button onClick={() => window.location.assign('/admin')} className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="text-sm font-semibold text-[#5b806b]">Sage Publishers / Content</div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Website Content</h1>
            <p className="mt-1 text-sm text-slate-500">Edit the text and image links used by the website.</p>
          </div>
        </div>

        {message && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            <CheckCircle2 className="h-5 w-5" /> {message}
          </div>
        )}

        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Add content field</h2>
          <p className="mt-1 text-sm text-slate-500">Create another editable value for the website.</p>
          <div className="mt-4 flex gap-3">
            <input value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="example: footer_text" className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#5b806b]" />
            <button onClick={addContent} className="inline-flex items-center gap-2 rounded-xl bg-[#103d2b] px-5 py-3 text-sm font-bold text-white hover:bg-[#14532d]"><Plus className="h-4 w-4" />Add</button>
          </div>
        </section>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading content…</div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <section key={`${item.content_key}-${index}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <label className="text-sm font-bold text-slate-900">{item.content_key}</label>
                    <p className="mt-1 text-xs text-slate-400">This key identifies the content value.</p>
                  </div>
                  {!item.id && <button onClick={() => removeUnsaved(index)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>}
                </div>
                <textarea value={item.value} onChange={(e) => update(index, { value: e.target.value })} placeholder="Enter website text…" className="min-h-28 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-[#5b806b]" />
                <input value={item.image_url || ''} onChange={(e) => update(index, { image_url: e.target.value })} placeholder="Optional image URL" className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#5b806b]" />
                <button onClick={() => save(item, index)} disabled={saving === item.content_key} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#103d2b] px-5 py-3 text-sm font-bold text-white disabled:opacity-60">
                  <Save className="h-4 w-4" /> {saving === item.content_key ? 'Saving…' : 'Save changes'}
                </button>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
