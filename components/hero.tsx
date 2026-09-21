'use client'

import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Play, Sparkles, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { FloatingLeaves } from './floating-leaves'

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
    image: '/animal-tales-fr.webp',
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

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500)
    return () => window.clearInterval(timer)
  }, [])

  const slide = slides[active]

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-forest-deep pt-28 text-cream md:min-h-screen md:pt-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,_rgba(82,200,120,0.18),_transparent_28%),radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.05),_transparent_22%)]" />
      <div aria-hidden="true" className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-emerald/12 blur-[120px]" />
      <div aria-hidden="true" className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-emerald/10 blur-[130px]" />
      <FloatingLeaves count={11} tone="dark" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-20 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:pb-24">
        <motion.div style={{ y: textY }} className="max-w-2xl text-center lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald sm:text-[11px]">
                <Sparkles className="h-3.5 w-3.5" /> {slide.label}
              </div>
              <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1] tracking-tight sm:text-5xl md:text-5xl xl:text-[4rem]">
                {slide.title}
                <br />
                <span className="text-emerald">{slide.accent}</span>
              </h1>
              <p className="mt-4 font-serif text-base italic text-cream/65 sm:text-lg">{slide.subtitle}</p>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-cream/70 sm:text-[15px] lg:mx-0">{slide.description}</p>
            </motion.div>
          </AnimatePresence>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.2 }} className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <a href="/payment" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-6 py-3 text-sm font-semibold text-forest-deep shadow-xl shadow-emerald/20 transition hover:-translate-y-0.5 sm:w-auto">
              Pay for the Book <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="/trailer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cream/15 bg-cream/5 px-6 py-3 text-sm font-semibold text-cream backdrop-blur-md transition hover:bg-cream/10 sm:w-auto">
              <Play className="h-4 w-4 fill-current" /> Watch Trailer
            </a>
          </motion.div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-cream/50 lg:justify-start">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-emerald" /> Secure online checkout</span>
            <span>Designed for family reading</span>
            <span>Made by Sage Publishers Ltd</span>
          </div>
        </motion.div>

        <motion.div style={{ y: bookY }} className="relative mx-auto w-full max-w-[30rem]">
          <div aria-hidden="true" className="absolute inset-8 rounded-[3rem] bg-emerald/20 blur-3xl" />
          <div className="relative rounded-[2rem] border border-cream/10 bg-cream/5 p-3 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.image}
                initial={{ opacity: 0, scale: 0.97, x: 18 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97, x: -18 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={slide.image} alt={slide.alt} width={900} height={900} priority={active === 0} className="aspect-square w-full rounded-[1.35rem] object-cover" />
              </motion.div>
            </AnimatePresence>

            <button aria-label="Previous book" onClick={() => setActive((active - 1 + slides.length) % slides.length)} className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-forest/70 p-2 text-cream backdrop-blur-md transition hover:bg-forest">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button aria-label="Next book" onClick={() => setActive((active + 1) % slides.length)} className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-forest/70 p-2 text-cream backdrop-blur-md transition hover:bg-forest">
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-cream/10 bg-forest/90 px-5 py-4 shadow-xl backdrop-blur-md sm:block">
              <p className="text-[9px] uppercase tracking-[0.18em] text-emerald">Featured title</p>
              <p className="mt-1 font-serif text-base font-semibold text-cream">{active === 0 ? 'A story for every heart.' : active === 1 ? 'Stories under the stars.' : 'Des histoires sous les étoiles.'}</p>
            </div>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-forest/70 px-3 py-2 backdrop-blur-md">
              {slides.map((item, index) => (
                <button
                  key={item.image}
                  aria-label={`Show slide ${index + 1}`}
                  aria-current={active === index}
                  onClick={() => setActive(index)}
                  className={`h-2 rounded-full transition-all ${active === index ? 'w-7 bg-emerald' : 'w-2 bg-cream/50 hover:bg-cream/80'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
