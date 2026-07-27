'use client'

import { motion } from 'motion/react'
import { Globe, Share2, AtSign, Mail } from 'lucide-react'

const socials = [
  { icon: Globe, label: 'Website', href: '#' },
  { icon: AtSign, label: 'Social', href: '#' },
  { icon: Share2, label: 'Share', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:mugaboan@gmail.com' },
]

const links = [
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Trailer', href: '#trailer' },
  { label: 'Contact', href: '#contact' },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest-deep text-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(34,197,94,0.12),_transparent_55%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <span className="font-serif text-2xl font-semibold">Sage Publishers Ltd</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">
              Crafting stories that inspire kindness, courage and imagination in young readers.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-cream/70 transition-colors hover:text-emerald"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 bg-cream/5 text-cream/80 transition-colors hover:border-emerald hover:text-emerald"
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6 text-center text-sm text-cream/50">
          <p>
            &copy; {new Date().getFullYear()} Sage Publishers Ltd. All rights reserved. The Breeze of
            the Forest.
          </p>
        </div>
      </div>
    </footer>
  )
}
