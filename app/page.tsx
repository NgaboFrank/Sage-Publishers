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
              <p className="font-[cursive] text-2xl font-bold normal-case tracking-normal text-[#D4A017] sm:text-3xl">From Our Gallery</p>
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
        <section aria-labelledby="discover-heading" className="bg-[#faf7f1] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div className="min-w-0">
              <p className="font-[cursive] text-2xl font-bold text-[#c58b12] sm:text-3xl">Discover the Magic</p>
              <h2 id="discover-heading" className="mt-4 max-w-2xl font-serif text-2xl font-semibold leading-[1.2] tracking-tight text-[#211e19] sm:text-3xl lg:text-4xl">What Young Readers Will Discover</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#625d54]">Every story opens a world of imagination, learning, and memorable moments for children and families.</p>
              <div className="mt-9 grid gap-3 sm:gap-4">
                {[
                  { icon: '✦', title: 'Courage & Confidence', text: 'Meet brave characters who discover the strength to try something new.' },
                  { icon: '♡', title: 'Kindness & Friendship', text: 'Explore thoughtful stories about caring, sharing, and growing together.' },
                  { icon: '✧', title: 'Imagination & Wonder', text: 'Step into colorful worlds filled with curious animals and exciting adventures.' },
                  { icon: '✿', title: 'The Joy of Reading', text: 'Create meaningful reading moments that children will remember.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-[#eee6d9] bg-white px-4 py-4 shadow-[0_3px_14px_rgba(39,32,22,0.035)] sm:px-5 sm:py-5">
                    
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg font-semibold leading-snug text-[#211e19] sm:text-xl">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#625d54]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-[#eae2d6] bg-white p-2.5 shadow-[0_14px_45px_rgba(36,31,22,0.09)] sm:p-3">
              <Image src="/2%20image.png" alt="Girl holding The Breeze of the Forest book" width={640} height={640} sizes="(max-width: 639px) calc(100vw - 64px), (max-width: 1023px) 480px, 480px" quality={65} loading="lazy" className="h-auto w-full rounded-xl object-contain" />
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
