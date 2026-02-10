'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMusic } from '@/components/MusicPlayer'

export default function WannaHangout2gether() {
  const { changeMusic } = useMusic()

  useEffect(() => {
    // Change to Japanese theme music
    changeMusic('/music/japanese-theme.mp3')
  }, [changeMusic])

  return (
    <main className="min-h-screen pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-teal-900/20 to-cyan-900/30" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-7xl font-bold mb-12 text-center"
          style={{
            background: 'linear-gradient(135deg, #ff3d9e 0%, #10b981 50%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Wanna Hangout 2gether?
        </motion.h1>

        <div className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden glow-pink border-4 border-hot-pink-500/30">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-800/20 to-teal-900/20" />
          
          {/* Japanese Pond GIF/Image */}
          <div className="relative w-full h-full">
            <Image
              src="/images/Koi Pond In A Leaf.gif"
              alt="Vintage Japanese pond side park"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Overlay elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating cherry blossoms */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * 100 + '%',
                  y: -50,
                  opacity: 0,
                }}
                animate={{
                  y: 'calc(100vh + 100px)',
                  opacity: [0, 1, 1, 0],
                  x: `${(Math.random() * 100)}%`,
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: 'linear',
                }}
                className="absolute text-3xl"
              >
                🌸
              </motion.div>
            ))}

            {/* Koi fish animation */}
            <motion.div
              animate={{
                x: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute bottom-20 text-6xl"
            >
              🐟
            </motion.div>
          </div>

          {/* Text overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-8 right-8 md:left-12 md:right-12"
          >
            <h2 className="font-display text-4xl md:text-6xl text-white mb-4 drop-shadow-lg">
              A Peaceful Moment Together
            </h2>
            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl drop-shadow-lg">
              Let's escape to this serene Japanese garden and enjoy the tranquility together. 
              The gentle sound of water, the beauty of nature, and your presence make this perfect.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 right-20 text-6xl opacity-30"
        >
          🎋
        </motion.div>
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-20 left-20 text-6xl opacity-30"
        >
          🏮
        </motion.div>
      </div>
    </main>
  )
}
