'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ClickToFindThePrettiestFace() {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isActive, setIsActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      })
      setStream(mediaStream)
      setIsActive(true)
      setError(null)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      setError('Unable to access camera. Please allow camera permissions.')
      console.error('Camera error:', err)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      setIsActive(false)
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <main className="min-h-screen pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-hot-pink-950/20 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,61,158,0.1),transparent_70%)]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Click To Find The Prettiest Face
          </h1>
          <p className="text-xl md:text-2xl text-hot-pink-200">
            Let's see that beautiful smile! 😊
          </p>
        </motion.div>

        <div className="relative w-full max-w-4xl">
          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative aspect-video rounded-2xl overflow-hidden glow-pink bg-gradient-to-br from-hot-pink-900/50 to-black/50 flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-8xl mb-4"
                  >
                    📷
                  </motion.div>
                  <p className="text-2xl text-hot-pink-200 mb-6">
                    Ready to find the prettiest face?
                  </p>
                  <motion.button
                    onClick={startCamera}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-hot-pink-500 to-hot-pink-700 rounded-full text-white font-semibold glow-pink hover:from-hot-pink-400 hover:to-hot-pink-600 transition-all"
                  >
                    Open Camera
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="camera"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative aspect-video rounded-2xl overflow-hidden glow-pink"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <p className="text-3xl md:text-5xl font-display text-white mb-4 drop-shadow-lg">
                      Found it! ✨
                    </p>
                    <p className="text-xl text-hot-pink-200 mb-6">
                      The prettiest face in the world!
                    </p>
                    <motion.button
                      onClick={stopCamera}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-hot-pink-500 to-hot-pink-700 rounded-full text-white font-semibold glow-pink hover:from-hot-pink-400 hover:to-hot-pink-600 transition-all"
                    >
                      Close Camera
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-center"
            >
              <p className="text-red-300">{error}</p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}
