'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const defaultGallery = [
  { src: '/animal-tales-fr.webp', alt: 'Contes d’animaux sous une nuit étoilée' },
  { src: '/animal-tales.webp', alt: 'Animal Tales Under a Starry Night Sky' },
  { src: '/book-cover.jpeg', alt: 'The Breeze of the Forest' },
]

export function Hero() {
  const [gallery, setGallery] = useState(defaultGallery)

  useEffect(() => {
    fetch('/api/home-content', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        const entry = (data.content || []).find((item: { content_key: string }) => item.content_key === 'home_gallery_images')
        if (!entry?.value) return
        const urls: unknown = JSON.parse(entry.value)
        if (Array.isArray(urls)) {
          const images = urls.filter((url): url is string => typeof url === 'string' && url.length > 0).slice(0, 3)
          if (images.length) setGallery(images.map((src, index) => ({ src, alt: defaultGallery[index]?.alt || 'Sage Publishers book' })))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="top" aria-label="Discover Sage Publishers books" className="bg-white pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <p className="font-[cursive] text-2xl font-bold text-[#D4A017] sm:text-3xl">Sage Publishers</p>
          <h1 className="mt-5 max-w-xl font-serif text-5xl font-bold leading-[1.08] tracking-tight text-black sm:text-6xl lg:text-7xl">Find your next story.</h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-700">Explore our books for young readers and families.</p>
          <Link href="/payment" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#F4C542] px-7 py-3 font-semibold text-black transition-colors hover:bg-[#e9b82c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">
            Order your copy <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4" aria-label="Book image gallery">
          {gallery.map((book, index) => (
            <Link key={book.src + index} href="/gallery" aria-label={`View gallery: ${book.alt}`} className={`group relative overflow-hidden rounded-2xl bg-[#f5f1e8] ${index === 0 ? 'col-span-2 aspect-[1.9/1]' : 'aspect-[1.1/1]'}`}>
              <Image src={book.src} alt={book.alt} fill priority={index === 0} sizes={index === 0 ? '(max-width: 1024px) 90vw, 52vw' : '(max-width: 1024px) 45vw, 26vw'} className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
