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

const siteUrl = 'https://sagepublishersltd.com'

const description =
  'Discover The Breeze of the Forest by Sage Publishers Ltd, a collection of entertaining and educational animal stories for children that inspire bravery, courage, kindness, friendship and imagination.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'The Breeze of the Forest | Sage Publishers Ltd',
    template: '%s | Sage Publishers Ltd',
  },

  description,

  keywords: [
    'Sage Publishers Ltd',
    'Sage Publishers Rwanda',
    'The Breeze of the Forest',
    'The Breeze of the Forest book',
    "children's books Rwanda",
    "children's books in Rwanda",
    'animal stories for children',
    'educational books for children',
    'bedtime stories for children',
    'coloring books for children',
    'kids books Rwanda',
    "African children's books",
    'bravery stories for children',
    'friendship stories for children',
  ],

  authors: [
    {
      name: 'Sage Publishers Ltd',
    },
  ],

  creator: 'Sage Publishers Ltd',
  publisher: 'Sage Publishers Ltd',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'The Breeze of the Forest | Sage Publishers Ltd',
    description,
    url: siteUrl,
    siteName: 'Sage Publishers Ltd',
    locale: 'en_RW',
    type: 'website',

    images: [
      {
        url: '/book-cover.jpeg',
        width: 1240,
        height: 1240,
        alt: "The Breeze of the Forest children's book by Sage Publishers Ltd",
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'The Breeze of the Forest | Sage Publishers Ltd',
    description,
    images: ['/book-cover.jpeg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
