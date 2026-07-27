import { SiteNav } from '@/components/site-nav'
import { GalleryPage as GalleryPageComponent } from '@/components/gallery-page'
import { BackButton } from '@/components/back-button'
import { SiteFooter } from '@/components/site-footer'

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
