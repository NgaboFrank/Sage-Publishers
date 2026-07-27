import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = 'https://breeze-of-the-forest.vercel.app'
const description =
  'The Breeze of the Forest is a magical collection of heartwarming animal tales for children that inspire bravery, kindness, friendship and imagination. Published by Sage Publishers Ltd.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'The Breeze of the Forest — Animal Stories for Children | Sage Publishers',
  description,
  keywords: [
    "children's book",
    'animal stories',
    'bedtime stories',
    'The Breeze of the Forest',
    'Sage Publishers',
    'coloring book',
    'kids reading',
  ],
  generator: 'v0.app',
  openGraph: {
    title: 'The Breeze of the Forest — Animal Stories for Children',
    description,
    url: siteUrl,
    siteName: 'The Breeze of the Forest',
    images: [
      {
        url: '/book-cover.jpeg',
        width: 1240,
        height: 1240,
        alt: 'The Breeze of the Forest book cover',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Breeze of the Forest — Animal Stories for Children',
    description,
    images: ['/book-cover.jpeg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#14532d',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
