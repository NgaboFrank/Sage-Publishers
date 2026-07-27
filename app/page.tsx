import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Features } from '@/components/features'
import { Gallery } from '@/components/gallery'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'
import { CallToAction } from '@/components/cta'
import { SiteFooter } from '@/components/site-footer'

const bookJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'The Breeze of the Forest',
  description:
    'A collection of entertaining and educational animal tales for children that inspire bravery, courage, kindness, friendship and imagination.',
  url: 'https://sagepublishersltd.com',
  image: 'https://sagepublishersltd.com/book-cover.jpeg',
  publisher: {
    '@type': 'Organization',
    name: 'Sage Publishers Ltd',
    url: 'https://sagepublishersltd.com',
  },
  genre: [
    "Children's literature",
    'Animal stories',
    'Educational stories',
  ],
  inLanguage: 'en',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sage Publishers Ltd',
  url: 'https://sagepublishersltd.com',
  description:
    'Sage Publishers Ltd publishes educational and entertaining books for children, including The Breeze of the Forest.',
  email: 'mailto:Mugaboan@gmail.com',
  telephone: '+250781087745',
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <SiteNav />

      <main>
        <Hero />
        <About />
        <Features />
        <Gallery />
        <Testimonials />
        <CallToAction />
        <Contact />
      </main>

      <SiteFooter />
    </>
  )
}
