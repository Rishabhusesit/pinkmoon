'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMusic } from '@/components/MusicPlayer'

export default function ClickForGift() {
  const { changeMusic } = useMusic()
  const [flowers, setFlowers] = useState<Array<{ id: number; x: number; delay: number }>>([])

  useEffect(() => {
    // Change to cute theme music
    changeMusic('/music/cute-theme.mp3')

    // Create falling flowers
    const flowerInterval = setInterval(() => {
      const newFlower = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        delay: Math.random() * 2,
      }
      setFlowers((prev) => [...prev, newFlower])
    }, 300)

    // Cleanup old flowers
    const cleanupInterval = setInterval(() => {
      setFlowers((prev) => prev.filter((f) => Date.now() - f.id < 10000))
    }, 1000)

    return () => {
      clearInterval(flowerInterval)
      clearInterval(cleanupInterval)
    }
  }, [changeMusic])

  const helloKittyVariants = {
    dance: {
      rotate: [0, -10, 10, -10, 10, 0],
      y: [0, -20, 0, -20, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <main className="min-h-screen pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-hot-pink-100 via-hot-pink-50 to-pink-100" />
      
      {/* Falling Flowers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {flowers.map((flower) => (
          <motion.div
            key={flower.id}
            initial={{ y: -50, x: `${flower.x}%`, opacity: 0 }}
            animate={{
              y: 'calc(100vh + 100px)',
              opacity: [0, 1, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + flower.delay,
              delay: flower.delay,
              ease: 'linear',
            }}
            className="absolute text-4xl"
          >
            🌸
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-7xl font-bold mb-12 text-center gradient-text"
        >
          Click For Gift
        </motion.h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              variants={helloKittyVariants}
              animate="dance"
              style={{ animationDelay: `${i * 0.2}s` }}
              className="text-8xl md:text-9xl"
            >
              🎀
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-9xl md:text-[12rem] mb-8"
          >
            🎁
          </motion.div>
          <p className="text-3xl md:text-4xl font-display text-hot-pink-700 mb-4">
            A Special Gift For You!
          </p>
          <p className="text-xl md:text-2xl text-hot-pink-600">
            You deserve all the happiness in the world! 💕
          </p>
        </motion.div>

        {/* Floating hearts */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${Math.random() * 100}%`,
              y: 'calc(100vh + 50px)',
              opacity: 0,
            }}
            animate={{
              y: -100,
              opacity: [0, 1, 1, 0],
              x: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear',
            }}
            className="absolute text-3xl"
          >
            💖
          </motion.div>
        ))}
      </div>
    </main>
  )
}
