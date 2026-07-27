'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { useRef } from 'react'
import { Play, Sparkles } from 'lucide-react'
import { FloatingLeaves } from './floating-leaves'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bookY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.4])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-forest-deep pt-28 pb-16 text-cream"
    >
      {/* soft radial glow background */}
      <motion.div
        aria-hidden="true"
        style={{ scale: glowScale }}
        className="absolute left-1/2 top-1/3 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-emerald/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.12),_transparent_60%)]"
      />
      <FloatingLeaves count={14} tone="dark" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div style={{ y: textY }} className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-emerald"
          >
            <Sparkles className="h-3.5 w-3.5" />
            A Sage Publishers Storybook
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            The Breeze
            <br />
            <span className="text-emerald">of the Forest</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 font-serif text-xl italic text-cream/70 sm:text-2xl"
          >
            Animal Stories for Children
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-cream/70 sm:text-lg lg:mx-0"
          >
            Discover a magical collection of heartwarming animal tales that inspire bravery,
            kindness, friendship and imagination.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-start lg:justify-start"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full rounded-full bg-emerald px-8 py-3.5 text-center font-semibold text-forest-deep shadow-lg shadow-emerald/30 sm:w-auto"
            >
              Buy Your Copy
            </motion.a>
            <motion.a
              href="/trailer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-cream/25 bg-cream/5 px-8 py-3.5 font-semibold text-cream backdrop-blur-sm sm:w-auto"
            >
              <Play className="h-4 w-4 fill-current" />
              Watch Trailer
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: bookY }}
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2rem] bg-emerald/25 blur-3xl"
            />
            <Image
              src="/book-cover.jpeg"
              alt="The Breeze of the Forest — hardcover book cover showing a watercolor forest scene with a fox, bear cub, deer, owl and other woodland animals"
              width={720}
              height={720}
              priority
              className="relative rounded-2xl shadow-2xl shadow-forest-deep/60 ring-1 ring-cream/10"
            />
          </motion.div>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  )
}
