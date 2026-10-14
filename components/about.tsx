'use client'

import Link from 'next/link'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import { Reveal } from './reveal'

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative isolate overflow-hidden bg-[#f8f5ec] py-20 sm:py-24 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#dce8d9]/60 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
        <Reveal>
          <div className="max-w-xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#b59a61]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#697d6b]">Our story · Sage Publishers Ltd</span>
            </div>
            <h2 id="about-heading" className="font-serif text-[clamp(2.8rem,5.5vw,5.4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[#123c28]">
              Little stories.<br /><span className="italic font-normal text-[#678a6c]">Big imagination.</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-8 text-[#53675b] sm:text-lg">
              We create beautifully illustrated children’s books that spark curiosity, inspire kindness, and make reading a joy.
            </p>
            <Link href="/about" className="group mt-8 inline-flex items-center gap-3 border-b border-[#123c28]/30 pb-2 text-sm font-semibold text-[#123c28] transition-colors hover:border-[#123c28]">
              Discover our story
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mx-auto w-full max-w-[510px]">
            <div aria-hidden="true" className="absolute -inset-4 rotate-[3deg] rounded-[2.5rem] border border-[#c9d6c6] sm:-inset-5" />
            <div className="relative overflow-hidden rounded-[2rem] bg-[#123c28] px-7 py-12 text-[#faf5e9] shadow-[0_25px_70px_rgba(18,60,40,0.16)] sm:px-12 sm:py-16">
              <div aria-hidden="true" className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
              <div aria-hidden="true" className="absolute -right-8 -top-12 h-48 w-48 rounded-full border border-white/10" />
              <BookOpen className="h-9 w-9 text-[#d4b975]" strokeWidth={1.2} aria-hidden="true" />
              <p className="mt-10 font-serif text-3xl leading-[1.18] tracking-[-0.02em] sm:text-4xl">
                Every great journey begins with a story.
              </p>
              <div className="mt-12 h-px w-full bg-white/20" />
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#e5d9b8]">
                <span>Imagination</span><span>Learning</span><span>Kindness</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
