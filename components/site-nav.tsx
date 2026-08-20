'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Why It Matters', href: '/features' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Trailer', href: '/trailer' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
]

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMobileOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => {
    if (href.includes('#')) return false
    return href === '/' ? pathname === '/' : pathname.startsWith(href)
  }

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4"
    >
      <nav className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 py-3 transition-all duration-300 md:px-4 ${scrolled ? 'border-cream/15 bg-forest-deep/88 shadow-2xl shadow-black/15 backdrop-blur-xl' : 'border-cream/10 bg-forest-deep/55 backdrop-blur-md'}`}>
        <Link href="/" className="flex min-w-0 items-center gap-3 rounded-xl px-2 py-1.5 text-cream">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald/15 ring-1 ring-emerald/20">
            <span className="font-serif text-lg font-semibold text-emerald">S</span>
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-base font-semibold tracking-tight md:text-lg">Sage Publishers</span>
            <span className="hidden text-[10px] uppercase tracking-[0.24em] text-cream/45 sm:block">Stories with purpose</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`rounded-xl px-3.5 py-2.5 text-[13px] font-medium transition-all ${isActive(link.href) ? 'bg-cream/10 text-cream' : 'text-cream/70 hover:bg-cream/6 hover:text-cream'}`}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/payment" className="hidden items-center gap-2 rounded-xl bg-emerald px-4 py-2.5 text-sm font-semibold text-forest-deep shadow-lg shadow-emerald/20 transition-transform hover:-translate-y-0.5 sm:inline-flex">
            Order the Book <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button onClick={() => setMobileOpen((v) => !v)} className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-cream hover:bg-cream/10 lg:hidden" aria-label="Toggle menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-auto mt-2 max-w-7xl rounded-2xl border border-cream/10 bg-forest-deep/95 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl lg:hidden">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setMobileOpen(false)} className={`block rounded-xl px-4 py-3 text-sm ${isActive(link.href) ? 'bg-emerald/15 text-emerald' : 'text-cream/75 hover:bg-cream/6 hover:text-cream'}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/payment" onClick={() => setMobileOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-emerald px-4 py-3 font-semibold text-forest-deep">
              Order the Book <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
