import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Features } from '@/components/features'
import { BackButton } from '@/components/back-button'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Why Children Love The Breeze of the Forest',
  description:
    'Discover why children love The Breeze of the Forest, with entertaining and educational animal stories that encourage bravery, kindness, friendship, imagination and a love of reading.',
  alternates: {
    canonical: '/features',
  },
  openGraph: {
    title: 'Why Children Love The Breeze of the Forest',
    description:
      'Explore the educational and entertaining features of The Breeze of the Forest, a children’s book published by Sage Publishers Ltd.',
    url: '/features',
    type: 'website',
  },
}

export default function FeaturesPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <BackButton />
        </div>
        <Features />
      </main>
      <SiteFooter />
    </>
  )
}
