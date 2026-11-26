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
            <p className="font-[cursive] text-[1.4rem] font-bold normal-case tracking-normal text-[#D4A017] sm:text-[1.65rem]">About Sage Publishers</p>
            <h2 id="about-heading" className="mt-5 font-serif text-[clamp(2.5rem,4vw,3.8rem)] font-semibold leading-[1.07] tracking-[-0.035em] text-black">
              {copy.about_title || <>Little stories.<br /><span className="text-black">Big imagination.</span></>}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#53675b] sm:text-[17px]">
              {copy.about_description || 'At Sage Publishers, we believe every child deserves a story worth remembering. We publish engaging, beautifully illustrated books that make reading enjoyable and help young readers discover new ideas, build confidence, and develop a lifelong love of books.'}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mx-auto w-full max-w-xl pb-[9%] pl-[9%] pr-[2%]">
            <div aria-hidden="true" className="absolute bottom-0 left-0 h-[85%] w-[98%] -rotate-12 rounded-[48%_52%_46%_54%] bg-[#FFE36A]" />
            <div className="relative flex min-h-[340px] flex-col justify-center rounded-[48%] bg-[#2E2921] px-[12%] py-16 text-center sm:aspect-square sm:min-h-0 sm:px-[14%] sm:py-12">
            <h3 className="font-serif text-[1.35rem] leading-tight text-[#fffdf6] sm:text-[1.65rem]">
              Stories that stay with you.
            </h3>
            <p className="mt-4 text-sm leading-6 text-[#e1ebe3]">
              Our books bring imagination and learning together through memorable characters, thoughtful storytelling, and illustrations that invite children to explore. Created for families, classrooms, and curious young minds, each story encourages kindness, courage, friendship, and the joy of discovering something new.
            </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
