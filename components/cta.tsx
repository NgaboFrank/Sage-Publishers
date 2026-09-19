'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { ArrowUpRight, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Reveal } from './reveal'
import { FloatingLeaves } from './floating-leaves'

const bookImages = [
  {
    src: '/book-cover.jpeg',
    alt: 'The Breeze of the Forest book cover',
  },
  {
    src: '/animal-tales.webp',
    alt: 'Animal Tales under a starry night sky book cover',
  },
]

export function CallToAction() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % bookImages.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [])

  const book = bookImages[active]

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
            <div className="relative rounded-[2rem] border border-cream/10 bg-cream/5 p-3 shadow-2xl shadow-black/20">
              <motion.div
                key={book.src}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image src={book.src} alt={book.alt} width={600} height={600} className="rounded-[1.4rem] aspect-square object-cover" />
              </motion.div>

              <button
                type="button"
                aria-label="Previous book"
                onClick={() => setActive((active - 1 + bookImages.length) % bookImages.length)}
                className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-forest/75 p-2 text-cream backdrop-blur-md transition hover:bg-forest"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label="Next book"
                onClick={() => setActive((active + 1) % bookImages.length)}
                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-forest/75 p-2 text-cream backdrop-blur-md transition hover:bg-forest"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-forest/75 px-3 py-2 backdrop-blur-md">
                {bookImages.map((item, index) => (
                  <button
                    key={item.src}
                    type="button"
                    aria-label={`Show book image ${index + 1}`}
                    aria-current={active === index}
                    onClick={() => setActive(index)}
                    className={`h-2 rounded-full transition-all ${active === index ? 'w-7 bg-emerald' : 'w-2 bg-cream/50 hover:bg-cream/80'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
