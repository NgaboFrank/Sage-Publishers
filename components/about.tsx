'use client'

import { Reveal } from './reveal'
import { useEffect, useState } from 'react'

export function About() {
  const [copy, setCopy] = useState<Record<string, string>>({})
  useEffect(() => {
    fetch('/api/home-content', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => setCopy(Object.fromEntries((data.content || []).filter((item: { content_key: string; value?: string }) => item.value).map((item: { content_key: string; value: string }) => [item.content_key, item.value]))))
      .catch(() => {})
  }, [])
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-[#f8f5ec] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
        <Reveal>
          <div className="max-w-xl">
            <p className="font-[cursive] text-2xl font-bold normal-case tracking-normal text-[#D4A017] sm:text-3xl">About Sage Publishers</p>
            <h2 id="about-heading" className="mt-5 font-serif text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[1.07] tracking-[-0.035em] text-black">
              {copy.about_title || <>Little stories.<br /><span className="text-black">Big imagination.</span></>}
            </h2>
            <p className="mt-7 max-w-lg text-base leading-8 text-[#53675b] sm:text-lg">
              {copy.about_description || 'At Sage Publishers, we believe every child deserves a story worth remembering. We publish engaging, beautifully illustrated books that make reading enjoyable and help young readers discover new ideas, build confidence, and develop a lifelong love of books.'}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl bg-[#2E2921] px-7 py-12 sm:px-11 sm:py-14">
            <h3 className="font-serif text-3xl leading-tight text-[#fffdf6] sm:text-4xl">
              Stories that stay with you.
            </h3>
            <p className="mt-6 text-base leading-8 text-[#e1ebe3]">
              Our books bring imagination and learning together through memorable characters, thoughtful storytelling, and illustrations that invite children to explore. Created for families, classrooms, and curious young minds, each story encourages kindness, courage, friendship, and the joy of discovering something new.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
