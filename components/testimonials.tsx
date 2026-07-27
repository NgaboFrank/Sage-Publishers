'use client'

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
  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">
              Loved by Families
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance text-forest sm:text-5xl">
              What parents are saying
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <motion.figure
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-sm"
              >
                <Quote className="h-9 w-9 text-emerald/30" aria-hidden="true" />
                <div className="mt-4 flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-pretty font-serif text-xl leading-relaxed text-forest">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="font-semibold text-forest">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
