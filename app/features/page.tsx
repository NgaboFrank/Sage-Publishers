import { SiteNav } from '@/components/site-nav'
import { Features } from '@/components/features'
import { BackButton } from '@/components/back-button'
import { SiteFooter } from '@/components/site-footer'

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
