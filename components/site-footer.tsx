import Link from 'next/link'
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Why It Matters', href: '/features' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Trailer', href: '/trailer' },
  { label: 'Contact', href: '/contact' },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest-deep text-cream">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(82,200,120,0.12),_transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-18">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/15 font-serif text-lg font-semibold text-emerald">S</span>
              <div>
                <p className="font-serif text-xl font-semibold">Sage Publishers Ltd</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-cream/40">Stories with purpose</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/55">Publishing thoughtful stories for young readers—designed to entertain, teach, and create meaningful family moments.</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/35">Explore</p>
            <nav className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {links.map((link) => <Link key={link.href} href={link.href} className="text-cream/65 transition hover:text-emerald">{link.label}</Link>)}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/35">Order & contact</p>
            <div className="mt-4 space-y-3 text-sm">
              <Link href="/payment" className="inline-flex items-center gap-2 text-emerald transition hover:text-cream">Order The Breeze of the Forest <ArrowUpRight className="h-4 w-4" /></Link>
              <a href="https://wa.me/250781087745" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cream/65 hover:text-emerald"><MessageCircle className="h-4 w-4" /> WhatsApp: +250 781 087 745</a>
              <a href="mailto:mugaboan@gmail.com" className="flex items-center gap-2 text-cream/65 hover:text-emerald"><Mail className="h-4 w-4" /> mugaboan@gmail.com</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/35 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Sage Publishers Ltd. All rights reserved.</p>
          <p>The Breeze of the Forest</p>
        </div>
      </div>
    </footer>
  )
}
