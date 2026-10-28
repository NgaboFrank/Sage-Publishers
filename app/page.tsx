import Image from 'next/image'
import Link from 'next/link'
import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { MobileOrderBar, FloatingWhatsApp } from '@/components/conversion'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sage Publishers Ltd',
  url: 'https://sagepublishersltd.com',
  description: 'Children’s books that inspire imagination and learning.',
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <section aria-labelledby="gallery-preview-heading" className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4A017]">From our gallery</p>
              <h2 id="gallery-preview-heading" className="mt-3 font-serif text-3xl font-semibold text-black sm:text-5xl">A glimpse inside the story</h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-700">Explore the characters and illustrated moments that bring The Breeze of the Forest to life.</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {[
                { src: '/forest-nest-family.jpg', title: 'Mani and her family', alt: 'Bird family resting together in a tree nest' },
                { src: '/forest-snake.jpg', title: 'Ntumi and the birds', alt: 'Snake and bird in the forest' },
                { src: '/forest-birds-flight.jpg', title: 'Across the forest', alt: 'Birds flying through the forest' },
              ].map((item) => (
                <Link href="/gallery" key={item.src} className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50">
                    <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                  </div>
                  <div className="px-5 py-4"><h3 className="font-serif text-xl font-semibold text-black">{item.title}</h3></div>
                </Link>
              ))}
            </div>
            <div className="mt-9 text-center">
              <Link href="/gallery" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F4C542] px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#E9B72D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">View the Gallery <span aria-hidden="true" className="ml-2">↗</span></Link>
            </div>
          </div>
        </section>
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
      <MobileOrderBar />
    </>
  )
}
