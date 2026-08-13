'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { CreditCard, Loader2, ShieldCheck } from 'lucide-react'

export default function PaymentPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function updateField(field: string, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handlePayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/pesapal/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Unable to start the payment.'
        )
      }

      if (!data.redirect_url) {
        throw new Error(
          'Pesapal did not return a payment URL.'
        )
      }

      window.location.href = data.redirect_url
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to start the payment.'
      )

      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background px-5 py-20 md:px-8 md:py-28">

      <div className="mx-auto max-w-2xl">

        <div className="mb-10 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald/15 text-emerald">
            <CreditCard className="h-8 w-8" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">
            Secure Payment
          </p>

          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-forest sm:text-5xl">
            Pay for Your Order
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Enter your details below to continue to Pesapal.
            You will be redirected to Pesapal to complete your payment securely.
          </p>

        </div>


        <form
          onSubmit={handlePayment}
          className="rounded-3xl border border-border bg-card p-7 shadow-xl shadow-forest/10 md:p-10"
        >

          <div className="space-y-6">

            <div className="flex flex-col gap-2">

              <label
                htmlFor="name"
                className="text-sm font-medium text-forest"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  updateField('name', e.target.value)
                }
                placeholder="Your full name"
                className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-emerald focus:ring-2 focus:ring-emerald/30"
              />

            </div>


            <div className="flex flex-col gap-2">

              <label
                htmlFor="email"
                className="text-sm font-medium text-forest"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  updateField('email', e.target.value)
                }
                placeholder="you@example.com"
                className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-emerald focus:ring-2 focus:ring-emerald/30"
              />

            </div>


            <div className="flex flex-col gap-2">

              <label
                htmlFor="phone"
                className="text-sm font-medium text-forest"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) =>
                  updateField('phone', e.target.value)
                }
                placeholder="+250 7XX XXX XXX"
                className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-emerald focus:ring-2 focus:ring-emerald/30"
              />

            </div>


            <div className="flex flex-col gap-2">

              <label
                htmlFor="amount"
                className="text-sm font-medium text-forest"
              >
                Amount (RWF)
              </label>

              <input
                id="amount"
                type="number"
                min="1"
                step="1"
                required
                value={form.amount}
                onChange={(e) =>
                  updateField('amount', e.target.value)
                }
                placeholder="10000"
                className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-emerald focus:ring-2 focus:ring-emerald/30"
              />

            </div>


            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}


            <motion.button
              type="submit"
              disabled={loading}
              whileHover={loading ? undefined : { scale: 1.02 }}
              whileTap={loading ? undefined : { scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald px-8 py-4 font-semibold text-forest-deep shadow-lg shadow-emerald/30 transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
            >

              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connecting to Pesapal...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  CONTINUE TO PESAPAL
                </>
              )}

            </motion.button>


            <div className="flex items-center justify-center gap-2 pt-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-emerald" />
              Secure payment powered by Pesapal
            </div>

          </div>

        </form>

      </div>

    </main>
  )
}
