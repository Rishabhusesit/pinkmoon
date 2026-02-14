'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

export default function VintageTVPage() {
  // ✅ Rotate these in order
  const slides = useMemo(() => ['/tv/2.jpg', '/tv/3.jpg'], [])
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length)
    }, 2500) // change speed here
    return () => clearInterval(t)
  }, [slides.length])

  /**
   * ✅ SCREEN PLACEMENT CONTROLS (alignment)
   * These are % of the full background image container.
   * Adjust these 4 values ONCE after you see it on screen.
   */
  const SCREEN = {
    left: 53.2,   // %
    top: 38.6,    // %
    width: 24.8,  // %
    height: 20.2, // %
    tilt: -6,     // deg (perspective feel)
  }

  return (
    <main className="tvPage">
      {/* Background room image */}
      <div className="tvBg">
        <Image
          src="/tv/room.jpeg"
          alt="Vintage TV room"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* TV screen overlay */}
      <div
        className="tvScreen"
        style={{
          left: `${SCREEN.left}%`,
          top: `${SCREEN.top}%`,
          width: `${SCREEN.width}%`,
          height: `${SCREEN.height}%`,
          transform: `perspective(900px) rotateY(${SCREEN.tilt}deg)`,
        }}
      >
        <Image
          key={slides[idx]}
          src={slides[idx]}
          alt="TV content"
          fill
          priority
          sizes="(max-width: 768px) 40vw, 25vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="tvScanlines" />
        <div className="tvVignette" />
      </div>
    </main>
  )
}
