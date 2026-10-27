'use client'

import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Play, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    title: 'The Breeze',
    accent: 'of the Forest',
    subtitle: 'Animal stories that children remember.',
    description: 'A beautifully illustrated collection of gentle adventures that encourage bravery, kindness, friendship and imagination, one story at a time.',
    image: '/book-cover.jpeg',
    alt: 'The Breeze of the Forest book cover',
    label: 'A Sage Publishers original',
  },
  {
    title: 'Animal Tales',
    accent: 'under a starry night sky',
    subtitle: 'Wild stories beneath a beautiful African sky.',
    description: 'A collection of animal tales filled with wonder, friendship and lessons for young readers, bringing the magic of the wild to every page.',
    image: '/animal-tales.webp',
    alt: 'Animal Tales under a starry night sky book cover',
    label: 'A Sage Publishers original',
  },
  {
    title: 'Contes d’animaux',
    accent: 'sous une nuit étoilée',
    subtitle: 'Des histoires sauvages sous un magnifique ciel africain.',
    description: 'Une collection de contes animaliers remplis de merveille, d’amitié et de leçons pour les jeunes lecteurs, avec la magie de la nature à chaque page.',
    image: '/animal-tales-fr.jpeg',
    alt: 'Couverture française de Contes d’animaux sous une nuit étoilée',
    label: 'Une création originale de Sage Publishers',
  },
]

export function Hero() {
  const [active, setActive] = useState(0)
  const [slideImages, setSlideImages] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/home-content', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, string> = {}
        for (const item of data.content || []) if (item.image_url) map[item.content_key] = item.image_url
        setSlideImages(map)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 9000)
    return () => window.clearInterval(timer)
  }, [])

  const slide = slides[active]
  const imageKeys = ['home_slide_breeze', 'home_slide_animal_tales', 'home_slide_animal_tales_fr']
  const slideImage = slideImages[imageKeys[active]] || slide.image

  return (
    <section id="top" aria-label="Featured books" className="relative isolate overflow-hidden bg-forest-deep pt-28 text-cream sm:pt-36">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 sm:px-8 sm:pb-24 lg:min-h-[650px] lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald">Stories worth sharing</p>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <h1 className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[1.04] tracking-tight">{slide.title} <span className="text-emerald">{slide.accent}</span></h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">{slide.subtitle}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/payment" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-emerald px-6 py-3 text-sm font-semibold text-forest-deep transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald">Order the Book <ArrowUpRight className="h-4 w-4" /></a>
            <a href="/gallery" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10">Explore Books</a>
          </div>
          <a href="/trailer" className="mt-6 inline-flex items-center gap-2 text-sm text-cream/75 underline-offset-4 hover:text-cream hover:underline"><Play className="h-4 w-4" /> Watch the trailer</a>
        </div>
        <div className="mx-auto w-full max-w-[440px]">
          <div className="relative overflow-hidden rounded-xl bg-cream/5 p-3 sm:p-5">
            <AnimatePresence mode="wait">
              <motion.div key={slideImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <Image src={slideImage} alt={slide.alt} width={900} height={900} priority={active === 0} sizes="(max-width: 640px) 90vw, 440px" className="aspect-square w-full rounded-md object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <span aria-live="polite" className="text-sm text-cream/65">{active + 1} / {slides.length}</span>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous book" onClick={() => setActive((active - 1 + slides.length) % slides.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-emerald"><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" aria-label="Next book" onClick={() => setActive((active + 1) % slides.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-emerald"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
