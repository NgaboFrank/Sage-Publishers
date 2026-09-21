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
    <section id="features" className="relative overflow-hidden bg-forest py-20 text-cream sm:py-24 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,_rgba(82,200,120,0.14),_transparent_42%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald">Why Children Love It</span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-balance sm:text-5xl">
              Stories that grow with your child
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-cream/65 sm:text-base">
              Thoughtful stories that entertain, inspire curiosity and introduce values children can carry into everyday life.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <Reveal key={feature.title} delay={(i % 4) * 0.06}>
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="group h-full min-h-[190px] rounded-[1.6rem] border border-cream/10 bg-white/[0.055] p-6 shadow-[0_18px_45px_rgba(4,20,13,0.10)] backdrop-blur-sm transition-all duration-300 hover:border-emerald/35 hover:bg-white/[0.085] sm:p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald/20 bg-emerald/10 text-emerald transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-6 font-serif text-[1.45rem] font-semibold leading-tight tracking-[-0.01em] text-cream">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-cream/60">{feature.text}</p>
                </motion.article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
