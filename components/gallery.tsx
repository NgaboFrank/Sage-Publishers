'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { Reveal } from './reveal'

type GalleryItem = {
  src: string
  alt: string
  span: string
}

const items: GalleryItem[] = [
  {
    src: '/forest-nest-family.jpg',
    alt: 'Pencil sketch of a bird family gathered in a nest high in the branches',
    span: '',
  },
  {
    src: '/forest-snake.jpg',
    alt: 'Pencil sketch of a snake facing a hawk swooping through bare winter trees',
    span: '',
  },
  {
    src: '/forest-birds-flight.jpg',
    alt: 'Pencil sketch of birds flying through a stormy forest of pines',
    span: '',
  },
]

export function Gallery() {
  const [active, setActive] = useState<GalleryItem | null>(null)

  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close])

  return (
    <section id="gallery" className="relative bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">
              Gallery
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance text-forest sm:text-5xl">
              Step inside the forest
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              A glimpse of the hand-painted world your little ones will fall in love with.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.src} delay={(i % 3) * 0.08} className={item.span}>
              <motion.button
                type="button"
                onClick={() => setActive(item)}
                whileHover={{ scale: 0.985 }}
                className="group relative h-[220px] w-full overflow-hidden rounded-2xl shadow-md shadow-forest/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 sm:h-[250px]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </motion.button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-3 rounded-full bg-emerald px-8 py-4 font-semibold text-forest-deep shadow-lg shadow-emerald/30 transition-all hover:shadow-xl hover:shadow-emerald/40"
            >
              View All Gallery
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </Reveal>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-deep/90 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
          >
            <motion.button
              type="button"
              onClick={close}
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream"
              aria-label="Close image"
            >
              <X className="h-5 w-5" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl"
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={1200}
                height={1200}
                className="h-auto max-h-[85vh] w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
