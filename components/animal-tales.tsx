'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from './reveal'

const animalSlides = [
  { image: '/animal-tales.webp', alt: 'Animal Tales book cover' },
  { image: '/forest-birds-flight.jpg', alt: 'Birds flying through the forest' },
  { image: '/forest-nest-family.jpg', alt: 'A family nest in the forest' },
]

export function AnimalTales() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % animalSlides.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="animal-tales" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-forest/15">
            <motion.div
              key={animalSlides[activeSlide].image}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={animalSlides[activeSlide].image}
                alt={animalSlides[activeSlide].alt}
                width={1080}
                height={1080}
                className="aspect-square w-full object-cover"
              />
            </motion.div>
            <button type="button" aria-label="Previous Animal Tales image" onClick={() => setActiveSlide((activeSlide - 1 + animalSlides.length) % animalSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-forest/70 p-2.5 text-cream shadow-lg backdrop-blur-md transition hover:bg-forest">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next Animal Tales image" onClick={() => setActiveSlide((activeSlide + 1) % animalSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-forest/70 p-2.5 text-cream shadow-lg backdrop-blur-md transition hover:bg-forest">
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-forest/75 px-3 py-2 backdrop-blur-md">
              {animalSlides.map((slide, index) => (
                <button key={slide.image} type="button" aria-label={`Show Animal Tales image ${index + 1}`} aria-current={activeSlide === index} onClick={() => setActiveSlide(index)} className={`h-2 rounded-full transition-all ${activeSlide === index ? 'w-7 bg-emerald' : 'w-2 bg-cream/60 hover:bg-cream'}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">About Animal Tales</span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance text-forest sm:text-5xl">Animal Tales for young readers</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>This book is a collection of animal stories for children. These stories can be read to them at bedtime, or children can read on their own and discover valuable life lessons.</p>
              <p>The moral lessons in this book will help them grow into kind and wonderful adults.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <BookOpen className="mt-1 h-6 w-6 shrink-0 text-emerald" />
              <div>
                <h3 className="font-serif text-lg font-semibold text-forest">Stories with meaningful lessons</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">A simple collection designed to make reading enjoyable while helping children discover positive values.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
