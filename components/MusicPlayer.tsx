'use client'

import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type MusicContextType = {
  changeMusic: (src: string) => void
  isPlaying: boolean
  togglePlay: () => void
}

const MusicContext = createContext<MusicContextType | null>(null)

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (!context) {
    // Return a default implementation if context is not available
    return {
      changeMusic: () => {},
      isPlaying: false,
      togglePlay: () => {},
    }
  }
  return context
}

export default function MusicPlayer({ defaultSrc = '/music/Kya Mujhe Pyaar Hai-(Mr-Jat.in).mp3' }: { defaultSrc?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [currentSrc, setCurrentSrc] = useState(defaultSrc)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSrc
      audioRef.current.load()
    }
  }, [currentSrc])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((error) => {
          console.log('Play prevented:', error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const changeMusic = (src: string) => {
    const wasPlaying = isPlaying
    if (audioRef.current && wasPlaying) {
      audioRef.current.pause()
    }
    setCurrentSrc(src)
    if (audioRef.current) {
      audioRef.current.src = src
      audioRef.current.load()
      if (wasPlaying) {
        setTimeout(() => {
          audioRef.current?.play().catch((error) => {
            console.log('Play prevented:', error)
          })
        }, 100)
      }
    }
  }

  return (
    <MusicContext.Provider value={{ changeMusic, isPlaying, togglePlay }}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50"
          >
            <div className="relative">
              <audio
                ref={audioRef}
                loop
                className="hidden"
              >
                <source src={currentSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              
              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-16 h-16 rounded-full bg-gradient-to-br from-hot-pink-500 to-hot-pink-700 flex items-center justify-center glow-pink transition-all duration-300 hover:from-hot-pink-400 hover:to-hot-pink-600"
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.svg
                      key="pause"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="play"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-6 h-6 text-white ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>
              
              {isPlaying && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 rounded-full border-2 border-hot-pink-400 opacity-50"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MusicContext.Provider>
  )
}
