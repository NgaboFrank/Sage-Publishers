import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Contact } from '@/components/contact'
import { BackButton } from '@/components/back-button'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Contact Sage Publishers Ltd',
  description:
    'Contact Sage Publishers Ltd for information about The Breeze of the Forest, our children’s books, publishing, orders and other enquiries.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Sage Publishers Ltd',
    description:
      'Get in touch with Sage Publishers Ltd for information about The Breeze of the Forest and our children’s books.',
    url: '/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <BackButton />
        </div>
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
