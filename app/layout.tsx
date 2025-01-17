'use client'

import { useState, useEffect } from 'react'
import { MainMenu } from '@/components/main-menu'
import { GuestMenu } from '@/components/guest-menu'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [session, setSession] = useState<null | { user: { email: string } }>(null)

  useEffect(() => {
    const storedSession = localStorage.getItem('session')
    if (storedSession) {
      setSession(JSON.parse(storedSession))
    }
  }, [])

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        {session ? <MainMenu /> : <GuestMenu />}
        {children}
      </body>
    </html>
  )
}

