import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { About } from '@/components/about'
import { AnimalTales } from '@/components/animal-tales'
import { BackButton } from '@/components/back-button'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'About Sage Publishers Ltd',
  description:
    'Learn about Sage Publishers Ltd and its children’s books, including The Breeze of the Forest and Animal Tales.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Sage Publishers Ltd',
    description:
      'Discover Sage Publishers Ltd and its collection of educational and entertaining animal stories for children.',
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
        <AnimalTales />
      </main>
      <SiteFooter />
    </>
  )
}
