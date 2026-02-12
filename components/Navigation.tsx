'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: '/home', label: 'Home' },
    { href: '/click-to-find-the-prettiest-face', label: 'Click To Find The Prettiest Face' },
    { href: '/click-for-gift', label: 'Click For Gift' },
    { href: '/vintage-tv', label: 'Vintage TV' },
    { href: '/find-a-pretty-face', label: 'Find A Pretty Face' },
    { href: '/wanna-hangout-2gether', label: 'Wanna Hangout 2gether?' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-rose-50/90 backdrop-blur-md border-b border-rose-200/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold gradient-text">
            Only For The Prettiest Girl
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-rose-600'
                    : 'text-rose-400 hover:text-rose-600'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
