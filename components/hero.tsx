'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'
import { ArrowUpRight, Play, Sparkles, ShieldCheck } from 'lucide-react'
import { FloatingLeaves } from './floating-leaves'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bookY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 38])

  return (
    <section ref={ref} id="top" className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-forest-deep pt-28 text-cream md:min-h-screen md:pt-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,_rgba(82,200,120,0.18),_transparent_28%),radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.05),_transparent_22%)]" />
      <div aria-hidden="true" className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-emerald/12 blur-[120px]" />
      <div aria-hidden="true" className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-emerald/10 blur-[130px]" />
      <FloatingLeaves count={11} tone="dark" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-20 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:pb-24">
        <motion.div style={{ y: textY }} className="max-w-2xl text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald">
            <Sparkles className="h-3.5 w-3.5" /> A Sage Publishers original
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mt-6 font-serif text-5xl font-semibold leading-[0.94] tracking-tight sm:text-5xl md:text-6xl xl:text-[5rem]">
            The Breeze
            <br />
            <span className="text-emerald">of the Forest</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.25 }} className="mt-5 font-serif text-lg italic text-cream/65 sm:text-xl">
            Animal stories that children remember.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.38 }} className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base lg:mx-0">
            A beautifully illustrated collection of gentle adventures that encourage bravery, kindness, friendship and imagination—one story at a time.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.5 }} className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <a href="/payment" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-7 py-3.5 font-semibold text-forest-deep shadow-xl shadow-emerald/20 transition hover:-translate-y-0.5 sm:w-auto">Pay for the Book <ArrowUpRight className="h-4 w-4" /></a>
            <a href="/trailer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cream/15 bg-cream/5 px-7 py-3.5 font-semibold text-cream backdrop-blur-md transition hover:bg-cream/10 sm:w-auto"><Play className="h-4 w-4 fill-current" /> Watch Trailer</a>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-cream/50 lg:justify-start">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald" /> Secure online checkout</span>
            <span>Designed for family reading</span>
            <span>Made by Sage Publishers Ltd</span>
          </div>
        </motion.div>

        <motion.div style={{ y: bookY }} initial={{ opacity: 0, scale: 0.94, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.22, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[34rem]">
          <div aria-hidden="true" className="absolute inset-8 rounded-[3rem] bg-emerald/20 blur-3xl" />
          <div className="relative rounded-[2rem] border border-cream/10 bg-cream/5 p-3 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-4">
            <Image src="/book-cover.jpeg" alt="The Breeze of the Forest book cover" width={900} height={900} priority className="rounded-[1.35rem]" />
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-cream/10 bg-forest/90 px-5 py-4 shadow-xl backdrop-blur-md sm:block">
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald">Featured title</p>
              <p className="mt-1 font-serif text-lg font-semibold text-cream">A story for every heart.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
