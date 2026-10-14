import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Gallery } from '@/components/gallery'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'
import { CallToAction } from '@/components/cta'
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
        <Gallery />
        <Testimonials />
        <CallToAction />
        <Contact />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
      <MobileOrderBar />
    </>
  )
}
