import { SiteNav } from '@/components/site-nav'
import { Trailer } from '@/components/trailer'
import { BackButton } from '@/components/back-button'
import { SiteFooter } from '@/components/site-footer'

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
