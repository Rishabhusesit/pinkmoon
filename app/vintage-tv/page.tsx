'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import MusicPlayer from '@/components/MusicPlayer'

export default function VintageTV() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <Navigation />
      <MusicPlayer />
      <main className="min-h-screen pt-20 relative overflow-hidden bg-gradient-to-b from-amber-50 via-rose-50 to-pink-50">
      {/* Cozy Room Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-rose-100/20 to-pink-100/30">
        {/* Wood texture overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%238B4513'/%3E%3Cpath d='M0 0h2v100H0z' fill='%23A0522D'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Vintage TV Box */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* TV Frame */}
          <div className="relative">
            {/* TV Screen Area */}
            <div className="relative bg-black rounded-lg p-4 shadow-2xl" style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
              boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8), 0 20px 60px rgba(0,0,0,0.5)',
            }}>
              {/* CRT Screen Effect */}
              <div className="relative bg-black rounded overflow-hidden" style={{
                boxShadow: 'inset 0 0 100px rgba(0,0,0,0.9)',
              }}>
                {/* Video Player */}
                <div className="relative aspect-video bg-black">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                  >
                    <source src="/videos/vintage-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* CRT Scanlines Effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                  }} />
                  
                  {/* Screen Glow */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    boxShadow: 'inset 0 0 100px rgba(255,192,203,0.1)',
                  }} />

                  {/* Play/Pause Overlay */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <motion.button
                        onClick={togglePlay}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-20 h-20 rounded-full bg-rose-400/80 flex items-center justify-center text-white text-4xl shadow-lg"
                      >
                        ▶
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>

              {/* TV Controls */}
              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  onClick={togglePlay}
                  className="px-4 py-2 bg-rose-300 text-white rounded hover:bg-rose-400 transition-colors"
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
                <div className="text-rose-400 text-sm">● REC</div>
              </div>
            </div>

            {/* TV Stand/Base */}
            <div className="mt-2 mx-auto w-3/4 h-8 bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-lg shadow-lg" style={{
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }} />

            {/* Antennas */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 flex gap-8">
              <div className="w-1 h-20 bg-gradient-to-b from-amber-700 to-amber-800 rounded-full" />
              <div className="w-1 h-20 bg-gradient-to-b from-amber-700 to-amber-800 rounded-full" />
            </div>
          </div>

          {/* Cozy Room Elements */}
          <div className="absolute -top-10 -left-10 text-6xl opacity-20">🪴</div>
          <div className="absolute -bottom-10 -right-10 text-6xl opacity-20">🕯️</div>
          <div className="absolute top-1/2 -left-20 text-5xl opacity-15">📚</div>
          <div className="absolute top-1/2 -right-20 text-5xl opacity-15">🪑</div>
        </motion.div>
      </div>
    </main>
    </>
  )
}
