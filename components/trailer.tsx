'use client'

import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { Reveal } from './reveal'
import { FloatingLeaves } from './floating-leaves'

export function Trailer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  // autoplay (muted) when the video scrolls into view, pause when out
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <section id="trailer" className="relative overflow-hidden bg-forest-deep py-24 text-cream md:py-32">
      <FloatingLeaves count={8} tone="dark" />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald">
              Watch the Trailer
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-balance sm:text-5xl">
              See the magic in motion
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div
            ref={containerRef}
            className="group relative mt-12 overflow-hidden rounded-3xl border border-cream/10 glass shadow-2xl shadow-forest-deep/60"
          >
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              src="/trailer.mp4"
              poster="/book-cover.jpeg"
              muted={muted}
              loop
              playsInline
              preload="none"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />

            {/* big center play button when paused */}
            {!playing && (
              <motion.button
                type="button"
                onClick={togglePlay}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Play trailer"
                className="absolute inset-0 z-10 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald text-forest-deep shadow-xl shadow-emerald/40"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-ping rounded-full bg-emerald/40"
                />
                <Play className="relative ml-1 h-8 w-8 fill-current" />
              </motion.button>
            )}

            {/* controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? 'Pause trailer' : 'Play trailer'}
                className="flex h-10 w-10 items-center justify-center rounded-full glass-dark text-cream transition-transform hover:scale-110"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? 'Unmute trailer' : 'Mute trailer'}
                className="flex h-10 w-10 items-center justify-center rounded-full glass-dark text-cream transition-transform hover:scale-110"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
