'use client'

import { Reveal } from './reveal'

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">
              About Sage Publishers Ltd
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance text-forest sm:text-5xl md:text-6xl">
              Inspiring young minds, one story at a time.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Sage Publishers Ltd is a children’s publishing company dedicated to creating meaningful,
              engaging, and educational books that inspire young readers. Our goal is to make reading
              enjoyable while helping children discover important values, develop their imagination,
              and learn lessons they can carry into everyday life.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal delay={0.15}>
            <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-sm md:p-8">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">What We Do</span>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  We create and share thoughtfully written and beautifully illustrated books for children.
                  Our stories are designed to entertain, encourage curiosity, and introduce positive values
                  such as kindness, courage, friendship, respect, and responsibility.
                </p>
                <p>
                  Our books are suitable for independent reading, family reading, and bedtime storytelling,
                  giving parents, guardians, teachers, and children opportunities to learn and enjoy stories together.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-sm md:p-8">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">More Than Just Stories</span>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  At Sage Publishers Ltd, we believe children’s books can do more than entertain. A good story
                  can help a child understand the world, develop empathy, think creatively, and build positive character.
                </p>
                <p>
                  Our publications combine storytelling, illustrations, and valuable life lessons to create reading
                  experiences that are both enjoyable and educational. Some of our books also include activities
                  that allow children to interact creatively with what they read.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-sm md:p-8">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">Our Website</span>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Our website makes it easy for readers, parents, schools, and organizations to discover our
                  publications, explore book information, view illustrations, learn more about our work, and place orders.
                </p>
                <p>
                  We also provide options for larger or bulk orders for schools, organizations, groups, and other interested customers.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-sm md:p-8">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">Our Purpose</span>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  Our purpose is to encourage a lasting love of reading and contribute to the growth and development
                  of young minds through quality children’s literature.
                </p>
                <p>
                  At Sage Publishers Ltd, every story is an opportunity to inspire, teach, and bring people together through the joy of reading.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
