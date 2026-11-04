'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'New Books', href: '/new-books' },
  { label: 'Why It Matters', href: '/features' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Trailer', href: '/trailer' },
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

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => {
    if (href.includes('#')) return false
    return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-0 pt-0"
    >
      <nav className={`mx-auto flex w-full items-center justify-between rounded-none border px-5 py-3 transition-all duration-300 sm:px-8 md:px-12 md:py-3 ${scrolled ? 'border-white/15 bg-[#124D8D] shadow-2xl shadow-black/15 backdrop-blur-xl' : 'border-white/10 bg-[#124D8D] backdrop-blur-md'}`}>
        <Link href="/" className="flex min-w-0 items-center gap-2 rounded-lg py-1 text-white">
          <span className="min-w-0">
            <span className="block truncate font-sans text-lg font-bold tracking-tight md:text-xl">Sage Publishers</span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-white/65">Stories with purpose</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/payment" className="hidden items-center gap-2 rounded-xl bg-[#F4C542] px-4 py-2.5 text-sm font-semibold text-forest-deep shadow-none transition-transform hover:-translate-y-0.5">
            Order the Book <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button onClick={() => setMobileOpen((v) => !v)} className="inline-flex h-9 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/15" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} id="mobile-navigation" className="mx-3 mt-2 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain rounded-xl border border-white/15 bg-[#124D8D] p-3 shadow-xl shadow-black/20 sm:ml-auto sm:mr-8 sm:w-80">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setMobileOpen(false)} aria-current={isActive(link.href) ? 'page' : undefined} className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive(link.href) ? 'bg-[#F4C542]/15 text-[#F4C542]' : 'text-white/85 hover:bg-white/10 hover:text-white'}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/payment" onClick={() => setMobileOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#F4C542] px-4 py-3 font-semibold text-forest-deep">
              Order the Book <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
