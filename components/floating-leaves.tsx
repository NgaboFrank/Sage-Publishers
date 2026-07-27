'use client'

import { motion } from 'motion/react'
import { Leaf } from 'lucide-react'
import { useMemo, useEffect, useState } from 'react'

type FloatingLeavesProps = {
  count?: number
  tone?: 'light' | 'dark'
}

// Deterministic leaf data - no randomness to prevent hydration mismatch
const LEAF_DATA = [
  { left: 8, size: 18, delay: 0, duration: 15, drift: -45, rotate: 45, opacity: 0.15 },
  { left: 15, size: 22, delay: 1.2, duration: 18, drift: 30, rotate: 120, opacity: 0.18 },
  { left: 22, size: 16, delay: 2.4, duration: 16, drift: -60, rotate: 200, opacity: 0.14 },
  { left: 32, size: 24, delay: 0.8, duration: 19, drift: 50, rotate: 280, opacity: 0.19 },
  { left: 42, size: 17, delay: 1.6, duration: 17, drift: -35, rotate: 90, opacity: 0.16 },
  { left: 52, size: 20, delay: 3.2, duration: 20, drift: 40, rotate: 160, opacity: 0.17 },
  { left: 62, size: 15, delay: 2, duration: 15, drift: -50, rotate: 250, opacity: 0.13 },
  { left: 70, size: 23, delay: 0.4, duration: 18, drift: 45, rotate: 310, opacity: 0.18 },
  { left: 78, size: 19, delay: 2.8, duration: 16, drift: -40, rotate: 60, opacity: 0.15 },
  { left: 85, size: 21, delay: 1.4, duration: 19, drift: 35, rotate: 140, opacity: 0.17 },
  { left: 92, size: 18, delay: 3.4, duration: 17, drift: -55, rotate: 220, opacity: 0.14 },
  { left: 5, size: 16, delay: 0.6, duration: 18, drift: 50, rotate: 340, opacity: 0.16 },
]

export function FloatingLeaves({ count = 12, tone = 'light' }: FloatingLeavesProps) {
  const [isMounted, setIsMounted] = useState(false)

  const leaves = useMemo(
    () =>
      LEAF_DATA.slice(0, count).map((leaf, i) => ({
        id: i,
        ...leaf,
      })),
    [count],
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render animated leaves on server to prevent hydration mismatch
  if (!isMounted) {
    return <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" />
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute -top-10"
          style={{ left: `${leaf.left}%`, opacity: leaf.opacity }}
          initial={{ y: -60, x: 0, rotate: leaf.rotate }}
          animate={{
            y: ['-10%', '115vh'],
            x: [0, leaf.drift, 0],
            rotate: [leaf.rotate, leaf.rotate + 180, leaf.rotate + 360],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        >
          <Leaf
            style={{ width: leaf.size, height: leaf.size }}
            className={tone === 'light' ? 'text-forest' : 'text-emerald'}
          />
        </motion.div>
      ))}
    </div>
  )
}
