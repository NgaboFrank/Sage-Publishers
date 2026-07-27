import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { About } from '@/components/about'
import { BackButton } from '@/components/back-button'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'About Sage Publishers Ltd',
  description:
    'Learn about Sage Publishers Ltd and The Breeze of the Forest, an entertaining and educational collection of animal stories that teaches children bravery, courage, kindness and friendship.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Sage Publishers Ltd',
    description:
      'Discover Sage Publishers Ltd and The Breeze of the Forest, a collection of educational and entertaining animal stories for children.',
    url: '/about',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <BackButton />
        </div>
        <About />
      </main>
      <SiteFooter />
    </>
  )
}
