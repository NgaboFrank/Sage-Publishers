'use client'

import { Reveal } from './reveal'

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">
            About Sage Publishers Ltd
          </span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance text-forest sm:text-5xl">
            Inspiring young minds, one story at a time.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Sage Publishers Ltd creates meaningful, engaging, and educational children’s books designed to make reading enjoyable while inspiring imagination, positive values, and a lasting love of learning.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border bg-card p-7 shadow-sm md:p-8">
            <p className="text-base leading-relaxed text-muted-foreground">
              Through thoughtful storytelling and beautiful illustrations, our books encourage kindness, courage, friendship, respect, responsibility, and curiosity. We create reading experiences for children, families, schools, and organizations, with options for both individual and bulk orders.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
