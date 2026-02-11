'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PasswordPopupProps {
  onSuccess: () => void
}

export default function PasswordPopup({ onSuccess }: PasswordPopupProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Windows 95/98 style beep sound effect (optional)
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGWi77+efTRAMUKfj8LZjHAY4kdfyzHksBSR3x/Dej0AKFF606euoVRQKRp/g8r5sIQUqgc7y2Yk2CBlou+/nn00QDFCn4/C2YxwGOJHX8sx5LAUkd8fw3o9AChRetOnrqFUUCkaf4PK+bCEFKoHO8tmJNggZaLvv559NE')
    // audio.play().catch(() => {})
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.toLowerCase() === 'moon') {
      setIsVisible(false)
      setTimeout(() => {
        onSuccess()
      }, 300)
    } else {
      setError('Invalid password. Please try again.')
      setPassword('')
      // Shake animation
      const input = document.getElementById('password-input')
      if (input) {
        input.classList.add('shake')
        setTimeout(() => input.classList.remove('shake'), 500)
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-[#008080] flex items-center justify-center z-50" style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
    }}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            {/* Windows 95/98 Style Popup */}
            <div className="bg-[#c0c0c0] border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#808080] border-b-[#808080] shadow-[inset_1px_1px_0_0_#000,2px_2px_0_0_#000]">
              {/* Title Bar */}
              <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 flex items-center justify-between text-xs font-bold" style={{ fontFamily: 'MS Sans Serif, sans-serif' }}>
                <span>🔒 Enter Password</span>
                <button
                  onClick={() => {}}
                  className="bg-[#c0c0c0] border border-t-[#ffffff] border-l-[#ffffff] border-r-[#000000] border-b-[#000000] px-2 hover:bg-[#d4d0c8] active:border-t-[#000000] active:border-l-[#000000] active:border-r-[#ffffff] active:border-b-[#ffffff]"
                  style={{ fontFamily: 'MS Sans Serif, sans-serif' }}
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-4 bg-[#c0c0c0]">
                <div className="mb-4">
                  <label className="block text-sm mb-2 text-black" style={{ fontFamily: 'MS Sans Serif, sans-serif' }}>
                    Password:
                  </label>
                  <input
                    id="password-input"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError('')
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmit(e)
                      }
                    }}
                    autoFocus
                    className="w-full px-2 py-1 border-2 border-t-[#000000] border-l-[#000000] border-r-[#ffffff] border-b-[#ffffff] bg-white text-black focus:outline-none focus:border-[#000080]"
                    style={{ fontFamily: 'Courier New, monospace' }}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-xs mt-1"
                      style={{ fontFamily: 'MS Sans Serif, sans-serif' }}
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-1 border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#000000] border-b-[#000000] bg-[#c0c0c0] text-black hover:bg-[#d4d0c8] active:border-t-[#000000] active:border-l-[#000000] active:border-r-[#ffffff] active:border-b-[#ffffff] text-xs font-bold"
                    style={{ fontFamily: 'MS Sans Serif, sans-serif' }}
                  >
                    OK
                  </button>
                  <button
                    onClick={() => setPassword('')}
                    className="px-4 py-1 border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#000000] border-b-[#000000] bg-[#c0c0c0] text-black hover:bg-[#d4d0c8] active:border-t-[#000000] active:border-l-[#000000] active:border-r-[#ffffff] active:border-b-[#ffffff] text-xs font-bold"
                    style={{ fontFamily: 'MS Sans Serif, sans-serif' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  )
}
