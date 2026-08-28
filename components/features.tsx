'use client'

import { motion } from 'motion/react'
import { Reveal } from './reveal'

type Feature = {
  title: string
  text: string
}

const features: Feature[] = [
  { title: 'Bravery', text: 'Characters face their fears and learn to be courageous.' },
  { title: 'Kindness', text: 'Warm stories that model compassion and empathy.' },
  { title: 'Friendship', text: 'Tales celebrating loyalty, trust and togetherness.' },
  { title: 'Imagination', text: 'Vivid worlds that spark wonder and creativity.' },
  {
    title: 'Educational Stories',
    text: 'Real-life scenarios that gently teach and guide.',
  },
  {
    title: 'Coloring Activities',
    text: 'Illustrations kids can color under supervision.',
  },
  { title: 'Bedtime Reading', text: 'Calming tales perfect for winding down at night.' },
  { title: 'Family Bonding', text: 'Shared moments that bring parents and children closer.' },
]

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-forest py-20 text-cream md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(34,197,94,0.15),_transparent_45%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald">
              Why Children Love It
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-balance sm:text-4xl">
              Stories that grow with your child
            </h2>
            <p className="mt-3 text-sm text-pretty leading-relaxed text-cream/70">
              Every tale is crafted to entertain while nurturing the values that shape kind,
              confident and curious young hearts.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 4) * 0.08}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group h-full rounded-2xl border border-cream/10 bg-cream/[0.06] p-5 backdrop-blur-sm transition-colors hover:border-emerald/40 hover:bg-cream/[0.1]"
              >
                <h3 className="font-serif text-xl font-semibold leading-snug">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{feature.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
