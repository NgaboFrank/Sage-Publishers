'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { Reveal } from './reveal'
import { FloatingLeaves } from './floating-leaves'

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-forest py-24 text-cream md:py-32">
      <FloatingLeaves count={12} tone="dark" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full bg-emerald/20 blur-[120px]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <Reveal>
            <h2 className="font-serif text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl">
              Bring the Magic Home
            </h2>
            <p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed text-cream/75 lg:mx-0">
              Give your little ones a treasury of tales they will ask for again and again. Order your
              copy of The Breeze of the Forest today.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="mt-8 inline-block rounded-full bg-emerald px-9 py-4 font-semibold text-forest-deep shadow-lg shadow-emerald/30"
            >
              Order Your Copy
            </motion.a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
            className="relative mx-auto max-w-sm"
          >
            <div aria-hidden="true" className="absolute -inset-4 rounded-3xl bg-emerald/20 blur-2xl" />
            <Image
              src="/book-cover.jpeg"
              alt="The Breeze of the Forest book cover"
              width={600}
              height={600}
              className="relative rounded-2xl shadow-2xl shadow-forest-deep/60 ring-1 ring-cream/10"
            />
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
