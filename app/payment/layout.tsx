import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure Book Payment',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function PaymentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
