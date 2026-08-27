import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase-admin'

const KEY = 'gallery_items'

const fallback = [
  { src: '/forest-nest-family.jpg', alt: 'Pencil sketch of a bird family gathered in a nest high in the branches', span: 'sm:col-span-2 sm:row-span-2' },
  { src: '/forest-snake.jpg', alt: 'Pencil sketch of a snake facing a hawk swooping through bare winter trees', span: '' },
  { src: '/forest-birds-flight.jpg', alt: 'Pencil sketch of birds flying through a stormy forest of pines', span: '' },
  { src: '/forest-fallen-nest.jpg', alt: 'Pencil sketch of a fledgling bird beneath a nest in the falling rain', span: 'sm:col-span-2' },
  { src: '/gallery/illustration-1.jpg', alt: 'Shepherd with goats gathered around a tent', span: 'sm:col-span-2' },
  { src: '/gallery/illustration-2.jpg', alt: 'Rhino in landscape with mountain and forest', span: 'sm:col-span-2 sm:row-span-2' },
  { src: '/gallery/illustration-3.jpg', alt: 'Forest scene with birds, animals and nature', span: '' },
  { src: '/gallery/illustration-4.jpg', alt: 'Two birds on a branch with hippopotamus and crocodile in forest', span: 'sm:col-span-2' },
  { src: '/gallery/illustration-6.jpg', alt: 'Heron and crocodile at water with nature', span: '' },
  { src: '/gallery/illustration-7.jpg', alt: 'Heron and crocodile in natural setting', span: '' },
  { src: '/gallery/illustration-8.jpg', alt: 'Bird on pole with hanging birdcages', span: 'sm:col-span-2' },
  { src: '/gallery/illustration-9.jpg', alt: 'Man in traditional clothing with goats and tent', span: '' },
  { src: '/gallery/illustration-10.jpg', alt: 'Snake and birds with clouds and rain', span: 'sm:col-span-2' },
  { src: '/gallery/illustration-11.jpg', alt: 'Person with fruits and shepherd with goats and tent', span: 'sm:col-span-2 sm:row-span-2' },
  { src: '/gallery/illustration-12.jpg', alt: 'Goat and deer in forest with pine trees', span: 'sm:col-span-2' },
  { src: '/gallery/illustration-13.jpg', alt: 'Two camels in pastoral landscape with tent', span: '' },
]

export async function GET() {
  try {
    const rows = await supabaseAdmin(`site_content?content_key=eq.${KEY}&select=value`)
    const value = rows?.[0]?.value
    if (!value) return NextResponse.json({ items: fallback })
    try {
      const items = JSON.parse(value)
      return NextResponse.json({ items: Array.isArray(items) ? items : fallback })
    } catch {
      return NextResponse.json({ items: fallback })
    }
  } catch {
    return NextResponse.json({ items: fallback })
  }
}
