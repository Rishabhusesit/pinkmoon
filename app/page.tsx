'use client'

import { useState, useEffect } from 'react'
import PasswordPopup from '@/components/PasswordPopup'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return <PasswordPopup onSuccess={() => setIsAuthenticated(true)} />
  }

  return null
}
