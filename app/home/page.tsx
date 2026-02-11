'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import MusicPlayer from '@/components/MusicPlayer'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <MusicPlayer />
      <main className="min-h-screen pt-20 relative overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 via-pink-50/30 to-rose-100/50" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="font-display text-7xl md:text-9xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 30%, #fbcfe8 60%, #fce7f3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Only For The Prettiest Girl
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-rose-400 font-light tracking-wide"
          >
            A beautiful journey begins here
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-4 justify-center"
          >
            <Link href="/click-to-find-the-prettiest-face">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Click To Find The Prettiest Face
              </motion.button>
            </Link>
            <Link href="/click-for-gift">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Click For Gift
              </motion.button>
            </Link>
            <Link href="/vintage-tv">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Vintage TV Room
              </motion.button>
            </Link>
            <Link href="/secrets">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Secrets
              </motion.button>
            </Link>
            <Link href="/wanna-hangout-2gether">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Wanna Hangout 2gether?
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
    </>
  )
}
