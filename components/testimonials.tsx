'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Star, Quote } from 'lucide-react'
import { Reveal } from './reveal'

type Testimonial = {
  quote: string
  name: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    quote: 'Our children ask for these stories every night. Bedtime has become the best part of our day.',
    name: 'Amara N.',
    role: 'Mother of two',
  },
  {
    quote: 'The illustrations are absolutely beautiful. My daughter loves coloring them while I read aloud.',
    name: 'Daniel K.',
    role: 'Father & teacher',
  },
  {
    quote: 'A wonderful way to teach kindness. Each tale sparks a real conversation with my son.',
    name: 'Grace M.',
    role: 'Parent',
  },
]

export function Testimonials() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setOffset((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  const visibleTestimonials = testimonials.map((_, index) =>
    testimonials[(index + offset) % testimonials.length],
  )

  return (
    <section className="relative bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-moss">
              Loved by Families
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-forest sm:text-4xl md:text-[2.7rem]">
              What parents are saying
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {visibleTestimonials.map((t, i) => (
            <Reveal key={`${t.name}-${offset}`} delay={i * 0.08}>
              <motion.figure
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative flex min-h-[290px] h-full flex-col rounded-2xl border border-border/80 bg-card p-7 shadow-[0_8px_30px_rgba(20,55,40,0.06)]"
              >
                <Quote className="h-7 w-7 text-emerald/25" aria-hidden="true" />
                <div className="mt-4 flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-pretty font-serif text-lg leading-8 text-forest">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border/80 pt-4">
                  <p className="text-sm font-semibold text-forest">{t.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t.role}</p>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-7 flex justify-center gap-1.5" aria-label="Testimonial rotation">
          {testimonials.map((t, index) => (
            <span
              key={t.name}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === offset ? 'w-6 bg-moss' : 'w-1.5 bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
