'use client'

import { useEffect, useState } from 'react'
import { Image as ImageIcon, Trash2, Upload, Save, CheckCircle2 } from 'lucide-react'

type GalleryItem = { src: string; alt: string; span: string }

export function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/gallery', { cache: 'no-store' })
    const data = await res.json()
    if (res.ok) setItems(data.items || [])
    else setMessage(data.error || 'Unable to load gallery.')
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function addImages(files: FileList | null) {
    if (!files?.length) return
    setUploading(true); setMessage('')
    const added: GalleryItem[] = []
    for (const file of Array.from(files)) {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (res.ok) added.push({ src: data.url, alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' '), span: '' })
      else setMessage(data.error || `Could not upload ${file.name}.`)
    }
    if (added.length) {
      const next = [...items, ...added]
      setItems(next)
      await saveItems(next)
      setMessage(`${added.length} image${added.length === 1 ? '' : 's'} added to the gallery.`)
    }
    setUploading(false)
  }

  async function saveItems(next = items) {
    setSaving(true)
    const res = await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: next }),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) setMessage(data.error || 'Could not save gallery.')
    return res.ok
  }

  async function remove(index: number) {
    if (!confirm('Remove this image from the website gallery?')) return
    const next = items.filter((_, i) => i !== index)
    setItems(next)
    await saveItems(next)
    setMessage('Image removed from the gallery.')
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-[#e7f1eb] p-3 text-[#14532d]"><ImageIcon className="h-6 w-6" /></div>
          <div><h2 className="text-xl font-bold">Website Gallery</h2><p className="text-sm text-slate-500">Add or remove images shown on the public gallery page.</p></div>
        </div>
        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#103d2b] px-5 py-3 text-sm font-bold text-white hover:bg-[#14532d]">
          <Upload className="h-4 w-4" /> {uploading ? 'Uploading…' : 'Add images'}
          <input type="file" accept="image/*" multiple className="hidden" disabled={uploading} onChange={(e) => { addImages(e.target.files); e.currentTarget.value = '' }} />
        </label>
      </div>

      {message && <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"><CheckCircle2 className="h-4 w-4" />{message}</div>}

      {loading ? <div className="mt-7 rounded-2xl bg-slate-50 p-8 text-center text-sm text-slate-500">Loading gallery…</div> : (
        <>
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item, index) => (
              <div key={`${item.src}-${index}`} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <img src={item.src} alt={item.alt} className="aspect-square w-full object-cover" />
                <button type="button" onClick={() => remove(index)} aria-label="Remove image" className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white opacity-0 shadow-lg transition group-hover:opacity-100 hover:bg-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="truncate px-3 py-2 text-xs font-medium text-slate-600">{item.alt}</div>
              </div>
            ))}
          </div>
          {items.length === 0 && <div className="mt-7 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">No gallery images. Add images to show them on the website.</div>}
          <button type="button" onClick={() => saveItems()} disabled={saving} className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60"><Save className="h-4 w-4" />{saving ? 'Saving…' : 'Save gallery'}</button>
        </>
      )}
    </div>
  )
}
