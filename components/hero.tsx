'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'

const fallbackImages = [
  { src: '/animal-tales-fr.webp', alt: 'Contes d’animaux sous une nuit étoilée' },
  { src: '/animal-tales.webp', alt: 'Animal Tales Under a Starry Night Sky' },
  { src: '/book-cover.jpeg', alt: 'The Breeze of the Forest' },
]

export function Hero() {
  const [images, setImages] = useState(fallbackImages)
  const [active, setActive] = useState(0)

  useEffect(() => {
    fetch('/api/home-content', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        const entry = (data.content || []).find((item: { content_key: string }) => item.content_key === 'home_gallery_images')
        if (!entry?.value) return
        const parsed: unknown = JSON.parse(entry.value)
        if (!Array.isArray(parsed)) return
        const urls = parsed.filter((value): value is string => typeof value === 'string' && value.length > 0)
        if (urls.length) {
          setImages(urls.map((src, index) => ({ src, alt: fallbackImages[index]?.alt || 'Sage Publishers gallery image' })))
          setActive(0)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || images.length < 2) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % images.length), 9000)
    return () => window.clearInterval(timer)
  }, [images.length])

  const image = images[active] || fallbackImages[0]

  return (
    <section id="top" aria-label="Sage Publishers" className="bg-white pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <p className="font-[cursive] text-2xl font-bold text-[#D4A017] sm:text-3xl">Sage Publishers</p>
          <h1 className="mt-5 font-serif text-5xl font-bold leading-[1.08] tracking-tight text-black sm:text-6xl lg:text-7xl">Find your next story.</h1>
          <p className="mt-6 text-base leading-relaxed text-black">Explore our books for young readers and families.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="/payment" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#F4C542] px-7 py-3 text-sm font-semibold text-black">Order your copy <ArrowUpRight className="h-4 w-4" /></a>
            <span className="inline-flex items-center gap-2 text-sm text-neutral-700"><ShieldCheck className="h-4 w-4 text-[#D4A017]" /> Secure checkout with Pesapal</span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[440px]">
          <div className="relative overflow-hidden rounded-[30px] bg-white p-3 shadow-xl">
            <div className="relative aspect-square overflow-hidden rounded-[22px]">
              <Image key={image.src} src={image.src} alt={image.alt} fill priority sizes="(max-width: 640px) 90vw, 440px" className="object-cover" />
            </div>
            {images.length > 1 && (
              <>
                <button type="button" aria-label="Previous gallery image" onClick={() => setActive((active - 1 + images.length) % images.length)} className="absolute left-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#173e2c] text-white"><ChevronLeft className="h-5 w-5" /></button>
                <button type="button" aria-label="Next gallery image" onClick={() => setActive((active + 1) % images.length)} className="absolute right-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#173e2c] text-white"><ChevronRight className="h-5 w-5" /></button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
