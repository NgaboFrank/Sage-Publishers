'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { MessageCircle, Mail, Smartphone, Copy, Check, Send, Loader2, MessageSquare } from 'lucide-react'
import { Reveal } from './reveal'

const MOMO_CODE = '*182*1*1*0781087745#'
const WHATSAPP_NUMBER = '250781087745'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function copyCode() {
    navigator.clipboard?.writeText(MOMO_CODE).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      setErrorMsg('Please fill in all fields.')
      return
    }

    setStatus('sending')
    setErrorMsg('')

    try {
      // Create email body with user details
      const emailBody = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      const subject = 'New Message - The Breeze of the Forest'
      const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=mugaboan@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`
      
      // Open Gmail compose
      window.open(mailtoLink, '_blank')
      
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setErrorMsg('Could not open Gmail. Please try again.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">
              Get Your Copy
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance text-forest sm:text-5xl">
              Order &amp; Pay with Ease
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Pay instantly with MTN Mobile Money, or reach out to order and arrange a bulk purchase
              for individuals, learning centers, organizations, and communities.
            </p>
            <div className="mt-6 inline-block rounded-full border border-emerald/30 bg-emerald/5 px-5 py-2">
              <p className="text-sm font-medium text-forest">
                📞 <span className="text-emerald">Contact us</span> to get the price and details
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Reveal>
            <motion.a
              href="sms:+250781087745"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex h-full flex-col items-start gap-4 rounded-3xl border border-border bg-card p-8 shadow-lg shadow-forest/10"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/15 text-emerald">
                <MessageCircle className="h-7 w-7" />
              </span>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-forest">Text to Order</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Send us a text and we&apos;ll help you order your copy.
                </p>
              </div>
              <p className="mt-auto font-serif text-2xl font-semibold text-forest">
                (+250) 781 087 745
              </p>
            </motion.a>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20I%20would%20like%20to%20order%20The%20Breeze%20of%20the%20Forest`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex h-full flex-col items-start gap-4 rounded-3xl border border-border bg-card p-8 shadow-lg shadow-forest/10"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/15 text-emerald">
                <MessageSquare className="h-7 w-7" />
              </span>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-forest">Message on WhatsApp</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Chat with us directly on WhatsApp for quick replies.
                </p>
              </div>
              <p className="mt-auto font-serif text-2xl font-semibold text-forest">
                (+250) 781 087 745
              </p>
            </motion.a>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.a
              href="mailto:mugaboan@gmail.com?subject=Bulk%20Purchase%20-%20The%20Breeze%20of%20the%20Forest"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex h-full flex-col items-start gap-4 rounded-3xl border border-border bg-card p-8 shadow-lg shadow-forest/10"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/15 text-emerald">
                <Mail className="h-7 w-7" />
              </span>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-forest">Bulk Purchase</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ordering in bulk? Contact us for special rates and arrangements.
                </p>
              </div>
              <p className="mt-auto break-all font-serif text-2xl font-semibold text-forest">
                mugaboan@gmail.com
              </p>
            </motion.a>
          </Reveal>
        </div>

        {/* Message form */}
        <Reveal delay={0.15}>
          <div className="mt-6 rounded-3xl border border-border bg-card p-8 shadow-lg shadow-forest/10 md:p-10">
            <div className="mb-6 text-center">
              <h3 className="font-serif text-2xl font-semibold text-forest">Send Us a Message</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in the form and we&apos;ll get back to you as soon as we can.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-forest">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Doe"
                    className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-emerald focus:ring-2 focus:ring-emerald/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-forest">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="jane@example.com"
                    className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-emerald focus:ring-2 focus:ring-emerald/30"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-forest">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="I'd like to order a copy of The Breeze of the Forest..."
                  className="resize-y rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-emerald focus:ring-2 focus:ring-emerald/30"
                />
              </div>

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <p
                  className={`text-sm ${
                    status === 'sent'
                      ? 'text-emerald'
                      : status === 'error'
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {status === 'sending'
                    ? 'Opening Gmail…'
                    : status === 'sent'
                      ? "Gmail is open! Send your message directly."
                      : status === 'error'
                        ? errorMsg
                        : 'Opens Gmail to send directly'}
                </p>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={status === 'sending' ? undefined : { scale: 1.04 }}
                  whileTap={status === 'sending' ? undefined : { scale: 0.96 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-8 py-3 font-semibold text-cream shadow-lg shadow-forest/25 disabled:opacity-70"
                >
                  {status === 'sending' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : status === 'sent' ? (
                    <Check className="h-5 w-5 text-emerald" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send Message'}
                </motion.button>
              </div>
            </form>
          </div>
        </Reveal>

        {/* Mobile Money payment highlight */}
        <Reveal delay={0.2}>
          <div className="mt-14 overflow-hidden rounded-3xl border border-emerald/20 bg-forest text-cream shadow-xl shadow-forest/25">
            <div className="grid items-center gap-8 p-8 md:grid-cols-[auto_1fr_auto] md:p-10">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald/15 text-emerald">
                <Smartphone className="h-8 w-8" />
              </span>

              <div className="text-center md:text-left">
                <h3 className="font-serif text-2xl font-semibold">Pay with Mobile Money</h3>
                <p className="mt-1 text-sm text-cream/70">
                  Dial the MTN MoMo code below on your phone to complete your payment.
                </p>
                <p className="mt-4 font-mono text-2xl font-semibold tracking-wide text-emerald sm:text-3xl">
                  {MOMO_CODE}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <motion.a
                  href={`tel:${encodeURIComponent(MOMO_CODE)}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald px-7 py-3 font-semibold text-forest-deep shadow-lg shadow-emerald/30"
                >
                  <Smartphone className="h-5 w-5" />
                  Dial Now
                </motion.a>
                <motion.button
                  type="button"
                  onClick={copyCode}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-7 py-3 font-semibold text-cream"
                >
                  {copied ? <Check className="h-5 w-5 text-emerald" /> : <Copy className="h-5 w-5" />}
                  {copied ? 'Copied' : 'Copy Code'}
                </motion.button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
