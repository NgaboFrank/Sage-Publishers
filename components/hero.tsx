'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowUpRight, BookOpen } from 'lucide-react'

const slides = [
  {
    title: 'The Breeze',
    accent: 'of the Forest',
    subtitle: 'Animal stories that children remember.',
    description: 'A beautifully illustrated collection of gentle adventures that encourage bravery, kindness, friendship and imagination, one story at a time.',
    image: '/book-cover.jpeg',
    alt: 'The Breeze of the Forest book cover',
    label: 'A Sage Publishers original',
  },
  {
    title: 'Animal Tales',
    accent: 'under a starry night sky',
    subtitle: 'Wild stories beneath a beautiful African sky.',
    description: 'A collection of animal tales filled with wonder, friendship and lessons for young readers, bringing the magic of the wild to every page.',
    image: '/animal-tales.webp',
    alt: 'Animal Tales under a starry night sky book cover',
    label: 'A Sage Publishers original',
  },
  {
    title: 'Contes d’animaux',
    accent: 'sous une nuit étoilée',
    subtitle: 'Des histoires sauvages sous un magnifique ciel africain.',
    description: 'Une collection de contes animaliers remplis de merveille, d’amitié et de leçons pour les jeunes lecteurs, avec la magie de la nature à chaque page.',
    image: '/animal-tales-fr.jpeg',
    alt: 'Couverture française de Contes d’animaux sous une nuit étoilée',
    label: 'Une création originale de Sage Publishers',
  },
]

export function Hero() {
  const [slideImages, setSlideImages] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/home-content', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, string> = {}
        for (const item of data.content || []) if (item.image_url) map[item.content_key] = item.image_url
        setSlideImages(map)
      })
      .catch(() => {})
  }, [])

  const imageKeys = ['home_slide_breeze', 'home_slide_animal_tales', 'home_slide_animal_tales_fr']

  return (
    <section id="top" aria-label="Featured books" className="bg-[#f7f7f5] pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-9 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B88400]">Sage Publishers</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-black sm:text-5xl">Discover stories worth sharing.</h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-600">Beautifully illustrated books for young readers and families.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {slides.map((book, index) => (
            <article key={book.image} className="grid min-h-[260px] grid-cols-[1fr_42%] gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex min-w-0 flex-col items-start">
                <span className="mb-4 text-[#B88400]" aria-hidden="true"><BookOpen className="h-5 w-5" /></span>
                <h2 className="font-serif text-xl font-semibold leading-snug text-black sm:text-2xl">{book.title} {book.accent}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">{book.subtitle}</p>
                <a href="/payment" className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-black hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">Order the book <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#F4C542]"><ArrowUpRight className="h-8 w-8" /></span></a>
              </div>
              <div className="relative min-h-[200px] overflow-hidden rounded-xl bg-[#f5f1e8]">
                <Image src={slideImages[imageKeys[index]] || book.image} alt={book.alt} fill sizes="(max-width: 768px) 38vw, 220px" priority={index === 0} className="object-contain p-2" />
              </div>
            </article>
          ))}
          <article className="grid min-h-[260px] grid-cols-[1fr_42%] gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col items-start">
              <BookOpen className="mb-4 h-5 w-5 text-[#B88400]" aria-hidden="true" />
              <h2 className="font-serif text-xl font-semibold text-black sm:text-2xl">More stories to explore</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">Browse our books and discover your next favorite story.</p>
              <a href="/gallery" className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-black hover:underline">Explore books <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#F4C542]"><ArrowUpRight className="h-8 w-8" /></span></a>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-[#f5f1e8] p-4"><BookOpen className="h-20 w-20 text-[#B88400]/60" aria-hidden="true" /></div>
          </article>
        </div>
      </div>
    </section>
  )
}
