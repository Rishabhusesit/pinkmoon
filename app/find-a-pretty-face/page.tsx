'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FindAPrettyFace() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.toLowerCase() === 'moon') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password. Try again!')
      setPassword('')
    }
  }

  const dysonProducts = [
    { name: 'Dyson V15', emoji: '🧹', id: 1 },
    { name: 'Dyson Airwrap', emoji: '💇', id: 2 },
    { name: 'Dyson Supersonic', emoji: '💨', id: 3 },
    { name: 'Dyson Purifier', emoji: '🌬️', id: 4 },
    { name: 'Dyson Vacuum', emoji: '✨', id: 5 },
    { name: 'Dyson Fan', emoji: '🌀', id: 6 },
  ]

  return (
    <main className="min-h-screen pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-hot-pink-950/20 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,61,158,0.1),transparent_70%)]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 gradient-text">
                  Find A Pretty Face
                </h1>
                <p className="text-xl md:text-2xl text-hot-pink-200 mb-8">
                  Enter your name to unlock
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError('')
                    }}
                    placeholder="Enter your name..."
                    className="w-full px-6 py-4 bg-black/50 border-2 border-hot-pink-500/50 rounded-full text-white placeholder-hot-pink-300/50 focus:outline-none focus:border-hot-pink-500 focus:glow-pink transition-all"
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-hot-pink-500 to-hot-pink-700 rounded-full text-white font-semibold glow-pink hover:from-hot-pink-400 hover:to-hot-pink-600 transition-all"
                >
                  Unlock Find A Pretty Face
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-6xl w-full"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-5xl md:text-7xl font-bold mb-12 text-center gradient-text"
              >
                Your Secret Collection
              </motion.h1>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {dysonProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50, rotate: -180 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{
                      delay: index * 0.1,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-gradient-to-br from-hot-pink-900/50 to-black/50 rounded-2xl p-8 text-center glow-pink border border-hot-pink-500/30"
                    >
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                          ease: 'easeInOut',
                        }}
                        className="text-7xl mb-4"
                      >
                        {product.emoji}
                      </motion.div>
                      <h3 className="text-2xl font-display text-hot-pink-200 mb-2">
                        {product.name}
                      </h3>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-hot-pink-500 to-transparent opacity-50" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mt-12 text-xl text-hot-pink-200"
              >
                All hanging with strings, just for you! 💕
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
