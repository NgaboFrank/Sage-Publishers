'use client'

import { BookOpen, Heart, Sparkles } from 'lucide-react'
import { Reveal } from './reveal'

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div aria-hidden="true" className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-gold/60" />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-moss">
                About Sage Publishers Ltd
              </span>
              <h2 className="mt-5 max-w-xl font-serif text-4xl font-semibold leading-[1.06] tracking-[-0.03em] text-forest sm:text-5xl md:text-[3.5rem]">
                Stories created to inspire young minds.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                We create meaningful children’s books that make reading enjoyable, encourage imagination, and share positive values that children can carry into everyday life.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-border/80 bg-card p-7 shadow-[0_20px_60px_rgba(7,31,20,0.07)] sm:p-9">
              <p className="font-serif text-2xl font-semibold leading-snug text-forest sm:text-[1.7rem]">
                Thoughtful stories. Beautiful illustrations. Meaningful lessons.
              </p>
              <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
                Our books bring children, families, and schools together through stories that encourage curiosity, kindness, courage, friendship, and a lasting love of reading.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-secondary/70 p-4">
                  <BookOpen className="h-5 w-5 text-moss" strokeWidth={1.7} />
                  <p className="mt-3 text-sm font-semibold text-forest">Engaging stories</p>
                </div>
                <div className="rounded-2xl bg-secondary/70 p-4">
                  <Sparkles className="h-5 w-5 text-moss" strokeWidth={1.7} />
                  <p className="mt-3 text-sm font-semibold text-forest">Creative learning</p>
                </div>
                <div className="rounded-2xl bg-secondary/70 p-4">
                  <Heart className="h-5 w-5 text-moss" strokeWidth={1.7} />
                  <p className="mt-3 text-sm font-semibold text-forest">Positive values</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
