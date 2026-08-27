'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Reveal } from './reveal'

type GalleryItem = {
  src: string
  alt: string
  span: string
}

const fallbackItems: GalleryItem[] = [
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

export function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(fallbackItems)
  const [active, setActive] = useState<GalleryItem | null>(null)

  useEffect(() => {
    fetch('/api/gallery', { cache: 'no-store' })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (Array.isArray(data?.items)) setItems(data.items)
      })
      .catch(() => {})
  }, [])

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close])

  return (
    <section id="gallery" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">Gallery</span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance text-forest sm:text-5xl">Step inside the forest</h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">Explore the hand-painted world and beautiful illustrations from The Breeze of the Forest.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-3 sm:auto-rows-[240px]">
          {items.map((item, i) => (
            <Reveal key={`${item.src}-${i}`} delay={(i % 3) * 0.08} className={item.span}>
              <motion.button type="button" onClick={() => setActive(item)} whileHover={{ scale: 0.985 }} className="group relative h-full w-full overflow-hidden rounded-2xl shadow-md shadow-forest/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2">
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-deep/90 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={active.alt}>
            <motion.button type="button" onClick={close} whileHover={{ scale: 1.1, rotate: 90 }} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream" aria-label="Close image"><X className="h-5 w-5" /></motion.button>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }} onClick={(e) => e.stopPropagation()} className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl">
              <Image src={active.src} alt={active.alt} width={1200} height={1200} className="h-auto max-h-[85vh] w-full object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
