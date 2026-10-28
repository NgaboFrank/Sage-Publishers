'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'

const slides = [
  {
    title: 'The Breeze',
    accent: 'of the Forest',
    subtitle: 'Animal stories that children remember.',
    description: 'A beautifully illustrated collection of gentle adventures that encourage bravery, kindness, friendship and imagination, one story at a time.',
    image: '/book-cover.jpeg',
    alt: 'The Breeze of the Forest book cover',
    label: 'A Sage Publishers original',
  },
  {
    title: 'Animal Tales',
    accent: 'under a starry night sky',
    subtitle: 'Wild stories beneath a beautiful African sky.',
    description: 'A collection of animal tales filled with wonder, friendship and lessons for young readers, bringing the magic of the wild to every page.',
    image: '/animal-tales.webp',
    alt: 'Animal Tales under a starry night sky book cover',
    label: 'A Sage Publishers original',
  },
  {
    title: 'Contes d’animaux',
    accent: 'sous une nuit étoilée',
    subtitle: 'Des histoires sauvages sous un magnifique ciel africain.',
    description: 'Une collection de contes animaliers remplis de merveille, d’amitié et de leçons pour les jeunes lecteurs, avec la magie de la nature à chaque page.',
    image: '/animal-tales-fr.jpeg',
    alt: 'Couverture française de Contes d’animaux sous une nuit étoilée',
    label: 'Une création originale de Sage Publishers',
  },
]

export function Hero() {
  const [slideImages, setSlideImages] = useState<Record<string, string>>({})
  const [sampleOpen, setSampleOpen] = useState(false)
  const [pendingSample, setPendingSample] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/home-content', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, string> = {}
        for (const item of data.content || []) if (item.image_url) map[item.content_key] = item.image_url
        setSlideImages(map)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!sampleOpen) return
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setSampleOpen(false) }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [sampleOpen])

  const imageKeys = ['home_slide_breeze', 'home_slide_animal_tales', 'home_slide_animal_tales_fr']

  return (
    <section id="top" aria-label="Featured books" className="bg-[#f7f7f5] pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="publisher-eyebrow text-xs font-semibold uppercase tracking-[0.16em] text-[#E0A000]">Sage Publishers</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-[#111111] sm:text-5xl">Where Little Stories Inspire Big Imaginations.</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#555555]">Discover beautifully illustrated books that spark curiosity, inspire kindness, and make every reading moment memorable.</p>
          <p className="our-books-label mt-6 font-[cursive] text-2xl font-bold text-[#D4A017] sm:text-3xl">Our Books</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {slides.map((book, index) => (
            <article key={book.image} className="grid min-h-[340px] grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,48%)] overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex min-w-0 flex-col items-start">
                
                <h2 className="font-serif text-2xl font-semibold leading-snug text-black sm:text-3xl">{book.title} {book.accent}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">{book.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700">{index === 0 ? 'Meet Mani, a little bird with big questions and a brave heart. Discover how her forest adventure begins in a free sneak peek.' : index === 1 ? 'Step into a starry African night where wild animals and unforgettable adventures await. Discover the magic of these stories and explore the book today.' : 'Entrez dans une nuit africaine étoilée, où les animaux et leurs aventures éveillent la curiosité. Découvrez la magie de ces histoires et explorez le livre dès aujourd’hui.'}</p>
                <button type="button" onClick={() => index === 0 ? setSampleOpen(true) : setPendingSample(index)} className="mt-5 rounded-full border border-[#E3B52D] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#FFF6D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">Read a Sample</button>
                <a href={`/payment?book=${encodeURIComponent(`${book.title} ${book.accent}`)}`} className="mt-4 inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full bg-[#F4C542] px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#E9B72D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">Order the Book <ArrowUpRight className="h-4 w-4" /></a>
              </div>
              <div className="relative min-h-[260px] overflow-hidden rounded-xl bg-[#f5f1e8] shadow-sm sm:min-h-[300px]">
                <Image src={slideImages[imageKeys[index]] || book.image} alt={book.alt} fill sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 310px" priority={index === 0} className="object-contain p-2 transition-transform duration-300 hover:scale-[1.02]" />
                {index === 0 && <button type="button" onClick={() => setSampleOpen(true)} aria-label="Read a sample of The Breeze of the Forest" className="absolute inset-0 z-10 cursor-pointer focus-visible:outline-4 focus-visible:outline-yellow-500" />}
              </div>
            </article>
          ))}
          <article className="grid min-h-[340px] grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,48%)] overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex min-w-0 flex-col items-start">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B88400]">Keep exploring</p>
              <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug text-black sm:text-3xl">Your next favorite story awaits</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">Every book opens a new world. Explore our illustrated stories, meet unforgettable characters, and find a story to share together.</p>
              <a href="/gallery" className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-semibold text-black hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">Explore books <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F4C542]"><ArrowUpRight className="h-4 w-4" /></span></a>
            </div>
            <a href="/gallery" aria-label="Explore the Sage Publishers illustration gallery" className="group relative grid min-h-[300px] grid-rows-2 gap-2 overflow-hidden rounded-xl bg-[#f8f4e8] p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500">
              <div className="relative min-h-0 overflow-hidden rounded-lg bg-white">
                <Image src="/gallery/illustration-9.jpg" alt="Illustration of a shepherd with his flock" fill sizes="(max-width: 640px) 45vw, 300px" className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]" />
              </div>
              <div className="relative min-h-0 overflow-hidden rounded-lg bg-white">
                <Image src="/gallery/illustration-11.jpg" alt="Illustration of a shepherd and sheep near a tent" fill sizes="(max-width: 640px) 45vw, 300px" className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]" />
              </div>
            </a>
          </article>
        </div>
      </div>
        {pendingSample !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setPendingSample(null) }}>
            <div role="dialog" aria-modal="true" aria-labelledby="pending-sample-title" className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl sm:p-9">
              <button type="button" onClick={() => setPendingSample(null)} aria-label="Close sample preview" className="absolute right-4 top-4 rounded-full p-2 text-black hover:bg-neutral-100"><X className="h-6 w-6" /></button>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#B88400]">Book preview</p>
              <h2 id="pending-sample-title" className="mt-3 pr-8 font-serif text-2xl font-bold text-black">{slides[pendingSample].title} {slides[pendingSample].accent}</h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-700">This book is available now. A reading excerpt can be added here once the sample text is provided.</p>
              <button type="button" onClick={() => setPendingSample(null)} className="mt-6 rounded-full bg-[#F4C542] px-6 py-3 text-sm font-semibold text-black">Close</button>
            </div>
          </div>
        )}
        {sampleOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setSampleOpen(false) }}>
            <div role="dialog" aria-modal="true" aria-labelledby="sample-title" className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-10">
              <button type="button" onClick={() => setSampleOpen(false)} aria-label="Close book sample" className="absolute right-4 top-4 rounded-full p-2 text-black hover:bg-neutral-100"><X className="h-6 w-6" /></button>
              <p className="text-xs font-bold uppercase tracking-widest text-[#B88400]">A peek inside the book</p>
              <h2 id="sample-title" className="mt-3 pr-8 font-serif text-3xl font-bold text-black">The Breeze of the Forest</h2>
              <p className="mt-2 text-sm text-neutral-500">Sample story · Mani’s Family and Ntumi the Snake</p>
              <div className="mt-6 space-y-4 border-y border-neutral-200 py-6 font-serif text-lg leading-8 text-neutral-800">
                <h3 className="text-2xl font-semibold text-black">Mani’s Family and Ntumi the Snake</h3>
                <h4 className="text-xl font-semibold text-black">Mani, the Brave!</h4>
                <p>Every morning was busy in Mani’s family. Her mother and older siblings each had their daily responsibilities, but Mani was still too young to fly. She stayed behind to watch over their nest, wishing she could go with the others and discover the world beyond the branches.</p>
                <p>Mani lived with her mother, her sister Nini, and another sibling. Their feathers were bright blue, with a white stripe across their backs. Her father had been away for so long that Mani had never met him. Although she loved her family, there was something she found difficult to tell them.</p>
                <p>Each day, Mani was expected to walk to the river to bathe. Sometimes she told her mother she had already washed, even when she had not. Her mother could see the truth by looking at the white stripe on Mani’s back. After this happened several times, her mother began to question Mani even when she was telling the truth.</p>
                <p>Mani felt sad. She wanted her mother to trust her again, so she turned to Nini, her quiet but courageous older sister, for advice.</p>
                <p>“What can I do to make Mum trust me again?” Mani asked. Nini explained that honesty was important in both small and big things. She then asked Mani why she had been avoiding the river.</p>
                <p>At last, Mani admitted what was troubling her. The river was far away, and she could not yet fly. Walking there alone frightened her, especially when other young birds laughed at her for being unable to fly with them.</p>
                <p>Nini listened carefully. She reassured Mani that every bird had once needed to learn to fly, and that their mother had good reasons for encouraging them to walk. Nini also promised to accompany her little sister to the river so she would no longer have to face the journey alone.</p>
                <p>But Mani had another question: why did birds need strong legs when they were supposed to fly? Nini thought it was a wonderful question and suggested they ask their mother together.</p>
                <p>Their mother explained that birds needed strong legs to land safely on branches and nests, to take off, and to search for food. Mani began to understand that the walks she disliked were helping her grow stronger.</p>
                <p>Feeling braver, Mani told her mother why she had lied about bathing. Her mother was proud that she had finally spoken honestly and reminded her that she could always talk about her fears. Mani and Nini returned to their games feeling happy and relieved.</p>
                <h4 className="text-xl font-semibold text-black">The Beginning of Troubles</h4>
                <p>The next morning, Mani’s family rose early to sing with the other birds and gently wake the forest. The rainy season had returned after a long, hot drought, and the trees were becoming green again. Food was easier to find, and Mani’s feathers and wings were growing.</p>
                <p>One evening, Mani refused the fruit her mother brought because she wanted her favourite beetles instead. Nini helped her understand why different foods mattered for growing strong and healthy. Mani apologised, learning another important lesson from her family.</p>
                <p>Yet Mani’s greatest adventure was still ahead. One day, while her mother was away and Nini went exploring with a friend, dark clouds began gathering above the forest. Mani was alone in the nest, and the sound of distant thunder filled her with fear. Would she find the courage to face what came next?</p>
                <p className="text-sm italic text-neutral-500">Preview adapted from the opening chapters of the supplied manuscript. The full book continues the story of Mani and the animals of the forest.</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="/payment" className="inline-flex items-center gap-2 rounded-full bg-[#F4C542] px-6 py-3 text-sm font-bold text-black hover:bg-[#EABF32]">Order the Book <ArrowUpRight className="h-4 w-4" /></a>
                <button type="button" onClick={() => setSampleOpen(false)} className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-black">Close Preview</button>
              </div>
            </div>
          </div>
        )}
    </section>
  )
}
