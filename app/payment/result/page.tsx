'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function PaymentResultPage() {
  const searchParams = useSearchParams()

  const trackingId = searchParams.get('OrderTrackingId')
  const merchantReference = searchParams.get(
    'OrderMerchantReference'
  )

  const [status, setStatus] = useState('Checking payment...')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkPayment() {
      if (!trackingId) {
        setStatus('Payment information was not received.')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          `/api/pesapal/status?orderTrackingId=${encodeURIComponent(
            trackingId
          )}`,
          {
            cache: 'no-store',
          }
        )

        const data = await response.json()

        if (!response.ok) {
          setStatus(
            data?.error || 'Unable to verify the payment.'
          )
          setLoading(false)
          return
        }

        if (data.status_code === 1) {
          setStatus(
            'Payment completed successfully. Thank you for choosing Sage Publishers.'
          )
        } else if (data.status_code === 2) {
          setStatus(
            'Payment failed. Please try again or contact Sage Publishers.'
          )
        } else if (data.status_code === 3) {
          setStatus(
            'Payment was reversed. Please contact Sage Publishers.'
          )
        } else {
          setStatus(
            'Your payment is still being processed. Please wait a moment.'
          )
        }
      } catch (error) {
        console.error(error)

        setStatus(
          'We could not verify your payment at this time.'
        )
      }

      setLoading(false)
    }

    checkPayment()
  }, [trackingId])

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: '#f5f5f5',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          background: '#ffffff',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        }}
      >
        <h1
          style={{
            fontSize: '32px',
            marginBottom: '20px',
          }}
        >
          {loading ? 'Checking Payment' : 'Payment Result'}
        </h1>

        <p
          style={{
            fontSize: '18px',
            lineHeight: '1.6',
            marginBottom: '25px',
          }}
        >
          {status}
        </p>

        {merchantReference && (
          <p
            style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '25px',
            }}
          >
            Reference: {merchantReference}
          </p>
        )}

        {!loading && (
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '14px 24px',
              background: '#111',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: 600,
            }}
          >
            Return to Sage Publishers
          </a>
        )}
      </div>
    </main>
  )
}
