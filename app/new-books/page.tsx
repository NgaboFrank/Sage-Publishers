import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ShoppingBag } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { BackButton } from '@/components/back-button'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'New Books',
  description: 'Discover the latest illustrated stories from Sage Publishers.',
  alternates: { canonical: '/new-books' },
}

const books = [
  {
    title: 'The Breeze of the Forest',
    subtitle: 'Animal stories that children remember.',
    description: 'Meet Mani, a little bird with big questions and a brave heart. Discover an illustrated forest adventure about courage, kindness, and friendship.',
    image: '/book-cover.jpeg',
    alt: 'The Breeze of the Forest book cover',
  },
  {
    title: 'Animal Tales under a starry night sky',
    subtitle: 'Wild stories beneath a beautiful African sky.',
    description: 'Explore animal stories full of wonder and adventure, with memorable characters and lessons for young readers.',
    image: '/animal-tales.webp',
    alt: 'Animal Tales under a starry night sky book cover',
  },
  {
    title: 'Contes d’animaux sous une nuit étoilée',
    subtitle: 'Histoires d’animaux pour les jeunes lecteurs.',
    description: 'Découvrez des contes animaliers illustrés qui célèbrent la curiosité, l’amitié et la magie de la nature.',
    image: '/animal-tales-fr.jpeg',
    alt: 'French Animal Tales book cover',
  },
]

export default function NewBooksPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-white pb-20 pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-5"><BackButton /></div>
          <Reveal className="border-b border-[#e9e6e0] pb-7 sm:pb-9">
            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#211e19] sm:text-5xl">New Books</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-[#625d54]">Explore our illustrated stories and find your next great read.</p>
          </Reveal>
          <div className="divide-y divide-[#e9e6e0]">
            {books.map((book, index) => (
              <Reveal key={book.title} delay={Math.min(index * 0.08, 0.16)} y={22}>
              <article key={book.title} className="grid gap-6 py-8 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[180px_minmax(0,1fr)_170px] lg:items-start lg:gap-9 lg:py-10">
                <div className="relative mx-auto h-[230px] w-[160px] overflow-hidden rounded-md bg-[#f7f6f3] sm:mx-0 sm:h-[250px] sm:w-[180px]">
                  <Image src={book.image} alt={book.alt} fill sizes="(max-width: 639px) 160px, 180px" className="object-cover object-center" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-serif text-2xl font-semibold leading-tight text-[#211e19] sm:text-3xl">{book.title}</h2>
                  <p className="mt-2 text-sm text-[#625d54]">{book.subtitle}</p>
                  {index < 2 && <p className="mt-3 text-lg font-bold text-[#211e19]">40,000 RWF</p>}
                  <div className="mt-5 max-w-2xl rounded-xl bg-[#f5f5f7] px-5 py-5">
                    <p className="text-sm leading-7 text-[#36333a]">{book.description}</p>
                  </div>
                  <Link href={`/payment?book=${encodeURIComponent(book.title)}`} className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#F4C542] px-6 text-sm font-semibold text-[#211e19] transition-colors hover:bg-[#e9b72d] lg:hidden">
                    <ShoppingBag className="h-4 w-4" /> Order the Book <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <Link href={`/payment?book=${encodeURIComponent(book.title)}`} className="hidden min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#F4C542] px-5 text-sm font-semibold text-[#211e19] transition-colors hover:bg-[#e9b72d] lg:inline-flex">
                  <ShoppingBag className="h-4 w-4" /> Order the Book
                </Link>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
