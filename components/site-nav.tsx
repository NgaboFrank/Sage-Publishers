'use client'

import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Why Children Love It', href: '/features' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Trailer', href: '/trailer' },
  { label: 'Contact', href: '/contact' },
]

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight text-cream transition-colors hover:text-emerald"
        >
          <span>Sage Publishers</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                  isActive(link.href)
                    ? 'bg-emerald/20 text-emerald'
                    : 'text-cream/80 hover:text-cream hover:bg-forest/20'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-emerald px-5 py-2 text-sm font-semibold text-forest-deep shadow-md shadow-emerald/30 transition-all hover:shadow-lg hover:shadow-emerald/40 hidden sm:inline-block"
          >
            Buy Your Copy
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex lg:hidden items-center justify-center w-10 h-10 rounded-lg text-cream hover:bg-forest/20"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-forest-deep/95 backdrop-blur-md border-t border-cream/10"
        >
          <div className="max-w-7xl mx-auto px-5 py-4">
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                      isActive(link.href)
                        ? 'bg-emerald/20 text-emerald'
                        : 'text-cream/80 hover:text-cream hover:bg-forest/20'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMobileOpen(false)}
              className="mt-4 block w-full rounded-full bg-emerald px-5 py-3 text-center text-sm font-semibold text-forest-deep shadow-md shadow-emerald/30 transition-all hover:shadow-lg hover:shadow-emerald/40"
            >
              Buy Your Copy
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
