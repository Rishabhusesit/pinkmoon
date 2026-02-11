import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import MusicPlayer from '@/components/MusicPlayer'
import Navigation from '@/components/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'Only For The Prettiest Girl',
  description: 'A beautiful, dynamic experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  )
}
