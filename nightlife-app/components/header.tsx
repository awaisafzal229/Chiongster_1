'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MainMenu } from './main-menu'

const bannerImages = [
  '/placeholder.svg?height=200&width=1000&text=Nightlife+Scene',
  '/placeholder.svg?height=200&width=1000&text=Cocktail+Bar',
  '/placeholder.svg?height=200&width=1000&text=Live+Music',
  '/placeholder.svg?height=200&width=1000&text=Dance+Club',
]

export function Header() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerImages.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  useEffect(() => {
    const interval = setInterval(nextBanner, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextBanner()
    }
    if (touchEndX.current - touchStartX.current > 50) {
      prevBanner()
    }
  }

  return (
    <header>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <MainMenu />
          <Link href="/">
            <Image
              src="/placeholder.svg?height=30&width=120&text=ChioNightOut"
              alt="ChioNightOut"
              width={120}
              height={30}
              className="h-8 w-auto ml-3"
            />
          </Link>
        </div>
      </div>
      <div 
        className="relative w-full h-[200px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {bannerImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Banner ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              index === currentBanner ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <button 
          onClick={prevBanner}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={nextBanner}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </header>
  )
}

