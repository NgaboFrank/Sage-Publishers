import { Suspense } from 'react'
import PaymentResult from './PaymentResult'

export default function PaymentResultPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentResult />
    </Suspense>
  )
}

function Loading() {
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
          background: '#ffffff',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        }}
      >
        <h1>Checking Payment...</h1>
      </div>
    </main>
  )
}
