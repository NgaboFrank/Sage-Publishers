import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { Trailer } from '@/components/trailer'
import { BackButton } from '@/components/back-button'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'The Breeze of the Forest Book Trailer',
  description:
    'Watch the trailer for The Breeze of the Forest, a children’s book of entertaining and educational animal stories about bravery, kindness, friendship and imagination.',
  alternates: {
    canonical: '/trailer',
  },
  openGraph: {
    title: 'The Breeze of the Forest Book Trailer',
    description:
      'Watch The Breeze of the Forest book trailer and discover the magical animal stories published by Sage Publishers Ltd.',
    url: '/trailer',
    type: 'website',
  },
}

export default function TrailerPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <BackButton />
        </div>
        <Trailer />
      </main>
      <SiteFooter />
    </>
  )
}
