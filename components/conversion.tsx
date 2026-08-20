'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, CheckCircle2, MessageCircle, ShieldCheck, BookOpen, Users } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    q: 'How do I order the book?',
    a: 'Tap “Order the Book” anywhere on the site, enter your details and amount, then continue to Pesapal to complete checkout securely.'
  },
  {
    q: 'Can I ask questions before ordering?',
    a: 'Yes. You can contact Sage Publishers directly through WhatsApp, text or email and ask about the book before placing your order.'
  },
  {
    q: 'Do you handle bulk orders?',
    a: 'Yes. Schools, learning centres, organisations and other groups can contact Sage Publishers about bulk purchases and arrangements.'
  },
  {
    q: 'What is the book about?',
    a: 'The Breeze of the Forest is a collection of entertaining and educational animal stories designed around values such as bravery, kindness, friendship and imagination.'
  },
  {
    q: 'Is it suitable for family reading?',
    a: 'Yes. The book is presented for family reading and includes illustrations that can also be used as a colouring activity for younger children under adult supervision.'
  },
]

export function PurchaseReasons() {
  const items = [
    { icon: ShieldCheck, title: 'Secure checkout', text: 'Continue to Pesapal for payment.' },
    { icon: BookOpen, title: 'Made for reading together', text: 'Stories designed for meaningful family moments.' },
    { icon: Users, title: 'Bulk orders welcome', text: 'Ask about group and organisational orders.' },
  ]

  return (
    <section className="relative border-y border-border bg-card py-8 md:py-10">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-3 md:px-8">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3 rounded-2xl bg-background/70 p-4 sm:bg-transparent sm:p-2">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald/12 text-emerald">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-forest">{title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">Questions</span>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-forest sm:text-5xl">Everything you need to know</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">Still deciding? Here are the answers to the questions families and organisations commonly have before ordering.</p>
        </div>

        <div className="mt-12 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          {faqs.map((item, index) => {
            const isOpen = open === index
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition hover:bg-background/70 sm:px-7 sm:py-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg font-semibold text-forest sm:text-xl">{item.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-moss transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <p className="px-5 pb-6 text-sm leading-7 text-muted-foreground sm:px-7 sm:text-base">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <p className="text-sm text-muted-foreground">Have another question?</p>
          <a href="https://wa.me/250781087745?text=Hi%20I%20have%20a%20question%20about%20The%20Breeze%20of%20the%20Forest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-forest underline decoration-emerald decoration-2 underline-offset-4">
            <MessageCircle className="h-4 w-4 text-emerald" /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export function MobileOrderBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-3 shadow-[0_-12px_35px_rgba(7,31,20,0.12)] backdrop-blur-xl sm:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold uppercase tracking-[0.14em] text-moss">The Breeze of the Forest</p>
          <p className="text-sm font-medium text-forest">Ready to order?</p>
        </div>
        <Link href="/payment" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-emerald px-5 text-sm font-bold text-forest-deep shadow-lg shadow-emerald/20">
          Order the Book
        </Link>
      </div>
    </div>
  )
}

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/250781087745?text=Hi%20I%20would%20like%20to%20order%20The%20Breeze%20of%20the%20Forest"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-emerald text-forest-deep shadow-xl shadow-forest/20 ring-4 ring-background sm:bottom-5 sm:right-5"
      aria-label="Chat with Sage Publishers on WhatsApp"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
    >
      <MessageCircle className="h-5 w-5" />
    </motion.a>
  )
}
