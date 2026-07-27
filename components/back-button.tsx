'use client'

import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function BackButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald/10 text-emerald hover:bg-emerald/20 transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>
    </motion.div>
  )
}
