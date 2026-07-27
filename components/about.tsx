'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { BookOpen, Moon, Palette } from 'lucide-react'
import { Reveal } from './reveal'

const highlights = [
  {
    icon: BookOpen,
    title: 'Values that last',
    text: 'Tales teaching bravery, courage, kindness and friendship.',
  },
  {
    icon: Moon,
    title: 'Perfect for bedtime',
    text: 'Gentle stories to share and strengthen the bond with your child.',
  },
  {
    icon: Palette,
    title: 'Colour as you read',
    text: 'Illustrations double as a supervised coloring activity.',
  },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="about" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div ref={ref} className="relative order-2 lg:order-1">
          <motion.div style={{ y: imageY }} className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-full w-full rounded-3xl border border-moss/40"
            />
            <Image
              src="/book-lifestyle.jpeg"
              alt="The Breeze of the Forest paperback resting on a wooden table beside a leafy plant in warm sunlight"
              width={1080}
              height={1080}
              className="relative rounded-3xl shadow-xl shadow-forest/15"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-4 rounded-2xl bg-forest px-6 py-4 text-cream shadow-lg sm:-right-6"
            >
              <p className="font-serif text-3xl font-semibold leading-none">Sage</p>
              <p className="text-xs uppercase tracking-[0.15em] text-cream/70">Publishers Ltd</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">
              About the Book
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance text-forest sm:text-5xl">
              A gentle forest full of lessons
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 space-y-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                The Breeze of the Forest is a book by Sage Publishers. It is a collection of
                entertaining and educational animal tales that spark children&apos;s imagination
                while teaching values such as bravery, courage, kindness and friendship. The stories
                also introduce lessons about negative behaviors children should learn to recognize
                and avoid.
              </p>
              <p>
                The book is perfect for bedtime reading, helping parents create meaningful moments
                while encouraging a lifelong love of reading.
              </p>
              <p>
                It also includes illustrations that can be used as a coloring activity for younger
                children under adult supervision, making reading both educational and fun.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((item, i) => (
              <Reveal key={item.title} delay={0.15 + i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <item.icon className="h-6 w-6 text-emerald" />
                  <h3 className="mt-3 font-serif text-lg font-semibold text-forest">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
