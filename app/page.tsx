import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Features } from '@/components/features'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'
import { CallToAction } from '@/components/cta'
import { SiteFooter } from '@/components/site-footer'
import { PurchaseReasons, FAQ, MobileOrderBar, FloatingWhatsApp } from '@/components/conversion'

const bookJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Book',
  name: 'The Breeze of the Forest',
  description:
    'A collection of entertaining and educational animal tales for children that inspire bravery, courage, kindness, friendship and imagination.',
  url: 'https://sagepublishersltd.com',
  image: 'https://sagepublishersltd.com/book-cover.jpeg',
  publisher: {
    '@type': 'Organization',
    name: 'Sage Publishers Ltd',
    url: 'https://sagepublishersltd.com',
  },
  genre: [
    "Children's literature",
    'Animal stories',
    'Educational stories',
  ],
  inLanguage: 'en',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ['How do I order the book?', 'Tap “Order the Book” anywhere on the site, enter your details and amount, then continue to Pesapal to complete checkout securely.'],
    ['Can I ask questions before ordering?', 'Yes. You can contact Sage Publishers directly through WhatsApp, text or email and ask about the book before placing your order.'],
    ['Do you handle bulk orders?', 'Yes. Schools, learning centres, organisations and other groups can contact Sage Publishers about bulk purchases and arrangements.'],
    ['What is the book about?', 'The Breeze of the Forest is a collection of entertaining and educational animal stories designed around values such as bravery, kindness, friendship and imagination.'],
    ['Is it suitable for family reading?', 'Yes. The book is presented for family reading and includes illustrations that can also be used as a colouring activity for younger children under adult supervision.'],
  ].map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sage Publishers Ltd',
  url: 'https://sagepublishersltd.com',
  description:
    'Sage Publishers Ltd publishes educational and entertaining books for children, including The Breeze of the Forest.',
  email: 'mailto:Mugaboan@gmail.com',
  telephone: '+250781087745',
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />

      <SiteNav />

      <main>
        <Hero />
        <PurchaseReasons />
        <About />
        <Features />
        <Testimonials />
        <CallToAction />
        <FAQ />
        <Contact />
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
      <MobileOrderBar />
    </>
  )
}
