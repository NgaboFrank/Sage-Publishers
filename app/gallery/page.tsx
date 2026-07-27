import type { Metadata } from 'next'
import { SiteNav } from '@/components/site-nav'
import { GalleryPage as GalleryPageComponent } from '@/components/gallery-page'
import { BackButton } from '@/components/back-button'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'The Breeze of the Forest Gallery',
  description:
    'Explore the gallery for The Breeze of the Forest, a children’s book filled with animal stories, imagination, friendship, kindness and adventure, published by Sage Publishers Ltd.',
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'The Breeze of the Forest Gallery',
    description:
      'Explore images and illustrations from The Breeze of the Forest, published by Sage Publishers Ltd.',
    url: '/gallery',
    type: 'website',
  },
}

export default function GalleryPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <BackButton />
        </div>
        <GalleryPageComponent />
      </main>
      <SiteFooter />
    </>
  )
}
