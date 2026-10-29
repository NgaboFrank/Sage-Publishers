'use client'

import { motion } from 'motion/react'
import { BookOpen, Heart, MoonStar, Palette, ShieldCheck, Sparkles, Users, WandSparkles } from 'lucide-react'
import { Reveal } from './reveal'

const features = [
  { title: 'Bravery', text: 'Characters face their fears and discover the confidence to move forward.', icon: ShieldCheck },
  { title: 'Kindness', text: 'Warm stories that encourage compassion, care and empathy.', icon: Heart },
  { title: 'Friendship', text: 'Meaningful tales about loyalty, trust and growing together.', icon: Users },
  { title: 'Imagination', text: 'Vivid worlds that invite children to wonder, dream and create.', icon: WandSparkles },
  { title: 'Educational Stories', text: 'Gentle, relatable lessons that help young readers learn through story.', icon: BookOpen },
  { title: 'Coloring Activities', text: 'Illustrations children can enjoy creatively with adult supervision.', icon: Palette },
  { title: 'Bedtime Reading', text: 'Calm, engaging stories made for peaceful family reading at night.', icon: MoonStar },
  { title: 'Family Bonding', text: 'Shared reading moments that bring parents and children closer.', icon: Sparkles },
]

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden bg-white py-16 text-black sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fbfaf7] to-white" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-[cursive] text-2xl font-bold normal-case tracking-normal text-[#D4A017] sm:text-3xl">Why It Matters</span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance text-black sm:text-4xl lg:text-5xl">
              Stories that grow with your child
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-600">
              Thoughtful stories that entertain, inspire curiosity and introduce values children can carry into everyday life.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <Reveal key={feature.title} delay={(i % 4) * 0.06}>
                <motion.article
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="group flex h-full min-h-[210px] flex-col rounded-2xl border border-[#e8e5de] bg-white p-6 shadow-[0_6px_24px_rgba(36,31,22,0.045)] transition-all duration-300 hover:border-[#e0c77a] hover:shadow-[0_12px_30px_rgba(36,31,22,0.08)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#f0e2b6] bg-[#fff8e4] text-[#a77c0a] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-semibold leading-snug tracking-tight text-[#211e19]">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5c5b56]">{feature.text}</p>
                </motion.article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
