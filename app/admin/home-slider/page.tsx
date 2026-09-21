'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, CheckCircle2, ImagePlus, Images, Save } from 'lucide-react'

type Slide = { key: string; label: string; description: string; image_url: string }
const defaults: Slide[] = [
  { key: 'home_slide_breeze', label: 'Slide 1 — The Breeze of the Forest', description: 'Main book image shown on the first homepage slide.', image_url: '' },
  { key: 'home_slide_animal_tales', label: 'Slide 2 — Animal Tales (English)', description: 'English Animal Tales book image.', image_url: '' },
  { key: 'home_slide_animal_tales_fr', label: 'Slide 3 — Contes d’animaux (French)', description: 'French Animal Tales book image.', image_url: '' },
]

export default function HomeSliderAdmin() {
  const [slides, setSlides] = useState(defaults)
  const [busy, setBusy] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/content', { cache: 'no-store' }).then(r => r.json()).then(data => {
      const map = new Map((data.content || []).map((x: any) => [x.content_key, x]))
      setSlides(defaults.map(s => ({ ...s, image_url: (map.get(s.key) as any)?.image_url || '' })))
    }).catch(() => {})
  }, [])

  async function choose(file: File, i: number) {
    setBusy(slides[i].key); setMessage('')
    const form = new FormData(); form.append('file', file)
    const r = await fetch('/api/admin/upload', { method: 'POST', body: form })
    const d = await r.json()
    if (!r.ok) { setBusy(null); setMessage(d.error || 'Upload failed.'); return }
    setSlides(v => v.map((s,n) => n === i ? { ...s, image_url: d.url } : s))
    setBusy(null); setMessage('Image uploaded. Click Save image to publish it.')
  }

  async function save(slide: Slide) {
    setBusy(slide.key); setMessage('')
    const r = await fetch('/api/admin/content', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({content_key:slide.key,value:'',image_url:slide.image_url}) })
    const d = await r.json(); setBusy(null)
    setMessage(r.ok ? 'Homepage slide image updated successfully.' : (d.error || 'Could not save image.'))
  }

  return <main className="min-h-screen bg-[#f6f8f7] px-5 py-8 text-[#10251b] lg:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="mb-7 flex items-center gap-4">
        <button onClick={()=>location.assign('/admin')} className="rounded-xl border border-slate-200 bg-white p-2.5"><ArrowLeft className="h-5 w-5"/></button>
        <div className="min-w-0 flex-1"><div className="text-sm font-semibold text-[#5b806b]">Sage Publishers / Images</div><h1 className="text-3xl font-bold">Website Images</h1><p className="mt-1 text-sm text-slate-500">Manage homepage slider images and gallery images from the admin.</p></div>
        <a href="/admin/gallery" className="inline-flex items-center gap-2 rounded-xl bg-[#103d2b] px-4 py-3 text-sm font-bold text-white hover:bg-[#14532d]"><Images className="h-4 w-4"/>Manage Gallery Images</a>
      </div>
      {message && <div className="mb-6 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"><CheckCircle2 className="h-5 w-5"/>{message}</div>}
      <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div><h2 className="text-xl font-bold">Gallery Images</h2><p className="mt-1 text-sm text-slate-500">Add, upload, replace, reorder or remove images shown on the Gallery page.</p></div>
          <a href="/admin/gallery" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#103d2b]/15 bg-[#eef5f1] px-5 py-3 text-sm font-bold text-[#103d2b]"><ImagePlus className="h-4 w-4"/>Open Gallery Manager</a>
        </div>
      </section>
      <h2 className="mb-4 text-xl font-bold">Home Slider Images</h2>
      <div className="grid gap-6 lg:grid-cols-3">{slides.map((s,i)=><section key={s.key} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">{s.image_url ? <img src={s.image_url} alt="" className="h-full w-full object-contain"/> : <div className="flex h-full items-center justify-center text-sm text-slate-400">Current website image</div>}</div>
        <h2 className="mt-5 text-lg font-bold">{s.label}</h2><p className="mt-1 min-h-10 text-sm text-slate-500">{s.description}</p>
        <label className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#103d2b]/15 bg-[#eef5f1] px-4 py-3 text-sm font-bold text-[#103d2b]"><ImagePlus className="h-4 w-4"/>Choose new image<input type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0]; if(f) choose(f,i)}}/></label>
        <button disabled={!s.image_url || busy===s.key} onClick={()=>save(s)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#103d2b] px-4 py-3 text-sm font-bold text-white disabled:opacity-50"><Save className="h-4 w-4"/>{busy===s.key?'Working…':'Save image'}</button>
      </section>)}</div>
    </div>
  </main>
}