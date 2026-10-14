'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Play, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    title: 'The Breeze',
    accent: 'of the Forest',
    subtitle: 'Animal stories that children remember.',
    description: 'A beautifully illustrated collection of gentle adventures that encourage bravery, kindness, friendship and imagination—one story at a time.',
    image: '/book-cover.jpeg',
    alt: 'The Breeze of the Forest book cover',
    label: 'A Sage Publishers original',
  },
  {
    title: 'Animal Tales',
    accent: 'under a starry night sky',
    subtitle: 'Wild stories beneath a beautiful African sky.',
    description: 'A collection of animal tales filled with wonder, friendship and lessons for young readers—bringing the magic of the wild to every page.',
    image: '/animal-tales.webp',
    alt: 'Animal Tales under a starry night sky book cover',
    label: 'A Sage Publishers original',
  },
  {
    title: 'Contes d’animaux',
    accent: 'sous une nuit étoilée',
    subtitle: 'Des histoires sauvages sous un magnifique ciel africain.',
    description: 'Une collection de contes animaliers remplis de merveille, d’amitié et de leçons pour les jeunes lecteurs—la magie de la nature à chaque page.',
    image: '/animal-tales-fr.jpeg',
    alt: 'Couverture française de Contes d’animaux sous une nuit étoilée',
    label: 'Une création originale de Sage Publishers',
  },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bookY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 38])
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
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500)
    return () => window.clearInterval(timer)
  }, [])

  const slide = slides[active]
  const imageKeys = ['home_slide_breeze', 'home_slide_animal_tales', 'home_slide_animal_tales_fr']
  const slideImage = slideImages[imageKeys[active]] || slide.image

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-forest-deep pt-24 text-cream sm:pt-28 lg:pt-32">

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-7 px-5 pb-12 pt-5 sm:gap-12 sm:pb-16 md:px-8 lg:grid-cols-[1fr_0.92fr] lg:gap-20 lg:pb-20 lg:pt-8">
        <motion.div style={{ y: textY }} className="min-w-0 w-full max-w-2xl text-center lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}>
              <h1 className={`font-serif font-semibold leading-[1.12] tracking-[-0.02em] [overflow-wrap:break-word] ${active === 0 ? 'text-[clamp(1.9rem,8vw,2.5rem)] sm:text-4xl md:text-5xl xl:text-[3.7rem]' : 'text-[clamp(1.75rem,7.5vw,2.25rem)] sm:text-4xl md:text-[3rem] xl:text-[3.4rem]'}`}>{slide.title}<br /><span className="text-emerald">{slide.accent}</span></h1>
              <p className="mx-auto mt-5 max-w-[34ch] text-[15px] leading-7 text-cream/85 sm:max-w-lg sm:text-lg sm:leading-8 lg:mx-0">{slide.subtitle}</p>
              <p className="mx-auto mt-3 max-w-[38ch] text-[15px] leading-7 text-cream/80 sm:max-w-lg sm:text-lg sm:leading-8 lg:mx-0">{slide.description}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.2 }} className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <a href="/payment" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-6 py-3 text-sm font-semibold text-forest-deep shadow-xl shadow-emerald/20 transition hover:-translate-y-0.5 sm:w-auto">Pay for the Book <ArrowUpRight className="h-4 w-4" /></a>
            <a href="/trailer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cream/15 bg-cream/5 px-6 py-3 text-sm font-semibold text-cream backdrop-blur-md transition hover:bg-cream/10 sm:w-auto"><Play className="h-4 w-4 fill-current" /> Watch Trailer</a>
          </motion.div>

        </motion.div>

        <motion.div style={{ y: bookY }} className="relative mx-auto w-full max-w-[22rem] sm:max-w-[27rem] lg:max-w-[31rem]">
          <div className="relative rounded-[2rem] border border-cream/10 bg-cream/5 p-3 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-4">
            <AnimatePresence mode="wait"><motion.div key={slideImage} initial={{ opacity: 0, scale: 0.97, x: 18 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.97, x: -18 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}><Image src={slideImage} alt={slide.alt} width={900} height={900} priority={active === 0} quality={72} sizes="(max-width: 640px) 88vw, (max-width: 1024px) 430px, 500px" className="aspect-square w-full rounded-[1.35rem] object-cover shadow-[0_28px_70px_rgba(0,0,0,0.28)]" /></motion.div></AnimatePresence>
            <button aria-label="Previous book" onClick={() => setActive((active - 1 + slides.length) % slides.length)} className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-forest/70 p-2 text-cream backdrop-blur-md transition hover:bg-forest"><ChevronLeft className="h-5 w-5" /></button>
            <button aria-label="Next book" onClick={() => setActive((active + 1) % slides.length)} className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-forest/70 p-2 text-cream backdrop-blur-md transition hover:bg-forest"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
