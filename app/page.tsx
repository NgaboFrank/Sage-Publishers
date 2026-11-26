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
        <section aria-labelledby="gallery-preview-heading" className="bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-[cursive] text-[1.4rem] font-bold normal-case tracking-normal text-[#D4A017] sm:text-[1.65rem]">From Our Gallery</p>
              <h2 id="gallery-preview-heading" className="mt-3 font-serif text-[1.8rem] font-semibold leading-tight tracking-tight text-[#211e19] sm:text-[2.25rem]">A glimpse inside the story</h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-700">Explore the characters and illustrated moments that bring The Breeze of the Forest to life.</p>
            </div>
            <div className="mt-9 grid gap-5 sm:grid-cols-3">
              {[
                { src: '/forest-nest-family.jpg', title: 'Mani and her family', alt: 'Bird family resting together in a tree nest' },
                { src: '/forest-snake.jpg', title: 'Ntumi and the birds', alt: 'Snake and bird in the forest' },
                { src: '/forest-birds-flight.jpg', title: 'Across the forest', alt: 'Birds flying through the forest' },
              ].map((item) => (
                <Link href="/gallery" key={item.src} className="group overflow-hidden rounded-2xl border border-[#e8e4dc] bg-white shadow-[0_4px_20px_rgba(28,25,20,0.045)] transition-shadow hover:shadow-md">
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
        <section aria-labelledby="discover-heading" className="bg-[#faf7f1] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div className="min-w-0 lg:order-2">
              <p className="font-[cursive] text-[1.2rem] font-bold text-[#c58b12] sm:text-[1.35rem]">Discover the Magic</p>
              <h2 id="discover-heading" className="mt-2 max-w-xl font-serif text-[1.75rem] font-semibold leading-tight tracking-tight text-[#211e19] sm:text-[2rem]">What Young Readers Will Discover</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#625d54]">
                Our stories invite children to explore new ideas, connect with memorable characters, and discover the joy of reading.
              </p>
              <div className="mt-7 divide-y divide-[#e5dfd5]">
                {[
                  { number: '01', title: 'Courage & Confidence', text: 'Follow characters who face challenges, make choices, and learn to believe in themselves.' },
                  { number: '02', title: 'Kindness & Friendship', text: 'Discover the importance of empathy, helping others, and building meaningful friendships.' },
                  { number: '03', title: 'Imagination & Curiosity', text: 'Explore imaginative adventures that encourage children to ask questions and discover new possibilities.' },
                  { number: '04', title: 'A Love for Reading', text: 'Enjoy engaging stories that make reading a rewarding experience for children and families.' },
                ].map((item) => (
                  <div key={item.number} className="flex gap-4 py-4 first:pt-0 sm:gap-5">
                    <span aria-hidden="true" className="pt-0.5 text-sm font-semibold tabular-nums text-[#b68116]">{item.number}</span>
                    <div className="min-w-0">
                      <h3 className="font-serif text-[1.05rem] font-semibold leading-snug text-[#211e19] sm:text-[1.15rem]">{item.title}</h3>
                      <p className="mt-1.5 max-w-md text-sm leading-6 text-[#625d54]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/new-books" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#F4C542] px-6 py-3 text-sm font-semibold text-[#211e19] transition-colors hover:bg-[#E9B72D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">
                Explore Our Books <span aria-hidden="true" className="ml-2">↗</span>
              </Link>
            </div>
            <div className="relative mx-auto w-full max-w-lg pb-[10%] pl-[10%] pr-[2%] lg:order-1">
              <div aria-hidden="true" className="absolute bottom-0 left-0 h-[85%] w-[98%] -rotate-12 rounded-[48%_52%_46%_54%] bg-[#FFF19A]" />
              <div className="relative aspect-square w-full overflow-hidden rounded-full">
                <Image src="/2%20image.png" alt="Young reader holding The Breeze of the Forest book" fill sizes="(max-width: 639px) 85vw, 460px" quality={85} loading="lazy" className="object-cover" />
              </div>
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
