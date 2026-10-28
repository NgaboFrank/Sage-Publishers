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

const storyCaptions: Record<string, { title: string; description: string }> = {
  '/forest-nest-family.jpg': { title: 'Mani and her family', description: 'Young Mani stays in the nest while her family carries out their daily tasks. She dreams of learning to fly.' },
  '/forest-snake.jpg': { title: 'Ntumi and the birds', description: 'Ntumi the snake becomes central to a troubling mystery that brings the forest animals together.' },
  '/forest-birds-flight.jpg': { title: 'Across the forest', description: 'Birds travel through the forest, where changing seasons bring both challenges and new adventures.' },
  '/forest-fallen-nest.jpg': { title: 'Mani learns courage', description: 'Mani longs to fly, but learning too quickly can bring unexpected trouble.' },
  '/gallery/illustration-1.jpg': { title: 'Life beyond the forest', description: 'A glimpse of the human world and its animals, beyond the birds’ familiar forest home.' },
  '/gallery/illustration-2.jpg': { title: 'The animals’ world', description: 'Many different animals share the landscapes surrounding the forest.' },
  '/gallery/illustration-3.jpg': { title: 'A forest full of stories', description: 'The forest is home to birds and other creatures whose lives become intertwined.' },
  '/gallery/illustration-4.jpg': { title: 'Friends at the river', description: 'Birds, crocodiles, and hippopotamuses are among the animals who help search for Mani.' },
  '/gallery/illustration-6.jpg': { title: 'By the water', description: 'The river connects the lives of many forest animals, including birds and crocodiles.' },
  '/gallery/illustration-7.jpg': { title: 'Life along the river', description: 'The forest’s waterways are important gathering places for its animal neighbours.' },
  '/gallery/illustration-8.jpg': { title: 'Birds belong in the sky', description: 'The animals learn that captured birds are being kept in cages by humans, instead of flying free.' },
  '/gallery/illustration-9.jpg': { title: 'The human world', description: 'The story also explores the world beyond the forest, where people keep animals near their homes.' },
  '/gallery/illustration-10.jpg': { title: 'Ntumi’s secret', description: 'The forest animals discover how Ntumi has betrayed other creatures and put birds in danger.' },
  '/gallery/illustration-11.jpg': { title: 'Beyond the trees', description: 'An illustration of people and animals in the wider world beyond the forest.' },
  '/gallery/illustration-12.jpg': { title: 'Forest neighbours', description: 'Different creatures live side by side in the rich landscape of the forest.' },
  '/gallery/illustration-13.jpg': { title: 'A wider world', description: 'The illustrations invite readers to explore the many animals and landscapes around the story.' },
}

export function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(fallbackItems)
  const [active, setActive] = useState<GalleryItem | null>(null)

  useEffect(() => {
    fetch('/api/gallery', { cache: 'no-store' })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (Array.isArray(data?.items) && data.items.length) setItems(data.items)
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
            <span className="font-[cursive] text-2xl font-bold text-[#D4A017] sm:text-3xl">Sage Publishers</span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance text-black sm:text-5xl">Find your next story.</h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">Explore beautiful illustrations and memorable moments from The Breeze of the Forest.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const caption = storyCaptions[item.src]
            return (
              <Reveal key={`${item.src}-${i}`} delay={(i % 3) * 0.08}>
                <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <motion.button type="button" onClick={() => setActive(item)} whileHover={{ scale: 0.99 }} aria-label={`View illustration: ${caption?.title || item.alt}`} className="group relative block aspect-[4/3] w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E0A000] focus-visible:ring-offset-2">
                    <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </motion.button>
                  <div className="p-5">
                    <h3 className="font-serif text-xl font-semibold text-black">{caption?.title || 'A moment from the gallery'}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-700">{caption?.description || item.alt}</p>
                  </div>
                </article>
              </Reveal>
            )
          })}
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
