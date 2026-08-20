'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Reveal } from './reveal'
import { FloatingLeaves } from './floating-leaves'

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-forest py-24 text-cream md:py-32">
      <FloatingLeaves count={10} tone="dark" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,_rgba(82,200,120,0.18),_transparent_30%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald">A book worth sharing</span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">Bring the magic home.</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-cream/70">Give young readers a collection they can grow with—stories to read together, talk about, and return to again and again.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.a href="/payment" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald px-7 py-3.5 font-semibold text-forest-deep shadow-xl shadow-emerald/20">Order your copy <ArrowUpRight className="h-4 w-4" /></motion.a>
              <span className="inline-flex items-center gap-2 text-sm text-cream/50"><ShieldCheck className="h-4 w-4 text-emerald" /> Secure checkout with Pesapal</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.08}>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="mx-auto max-w-sm">
            <div className="rounded-[2rem] border border-cream/10 bg-cream/5 p-3 shadow-2xl shadow-black/20">
              <Image src="/book-cover.jpeg" alt="The Breeze of the Forest book cover" width={600} height={600} className="rounded-[1.4rem]" />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
