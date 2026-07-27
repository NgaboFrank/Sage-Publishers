'use client'

import { motion } from 'motion/react'
import {
  Shield,
  Heart,
  Users,
  Sparkles,
  GraduationCap,
  Palette,
  Moon,
  House,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from './reveal'

type Feature = {
  icon: LucideIcon
  title: string
  text: string
}

const features: Feature[] = [
  { icon: Shield, title: 'Bravery', text: 'Characters face their fears and learn to be courageous.' },
  { icon: Heart, title: 'Kindness', text: 'Warm stories that model compassion and empathy.' },
  { icon: Users, title: 'Friendship', text: 'Tales celebrating loyalty, trust and togetherness.' },
  { icon: Sparkles, title: 'Imagination', text: 'Vivid worlds that spark wonder and creativity.' },
  {
    icon: GraduationCap,
    title: 'Educational Stories',
    text: 'Real-life scenarios that gently teach and guide.',
  },
  {
    icon: Palette,
    title: 'Coloring Activities',
    text: 'Illustrations kids can color under supervision.',
  },
  { icon: Moon, title: 'Bedtime Reading', text: 'Calming tales perfect for winding down at night.' },
  { icon: House, title: 'Family Bonding', text: 'Shared moments that bring parents and children closer.' },
]

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-forest py-24 text-cream md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(34,197,94,0.15),_transparent_45%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald">
              Why Children Love It
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance sm:text-5xl">
              Stories that grow with your child
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-cream/70">
              Every tale is crafted to entertain while nurturing the values that shape kind,
              confident and curious young hearts.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 4) * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group h-full rounded-2xl border border-cream/10 bg-cream/[0.06] p-6 backdrop-blur-sm transition-colors hover:border-emerald/40 hover:bg-cream/[0.1]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/15 text-emerald transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-serif text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{feature.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
