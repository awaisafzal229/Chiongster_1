'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const bannerImages = [
  'https://s3-ap-southeast-1.amazonaws.com/atap-main/gallery-full/b58323ea-8395-449b-93c1-aaf989e17f38/the-majestic-club-ktv-room-a.jpg',
  'https://scontent.fkul3-3.fna.fbcdn.net/v/t39.30808-6/294687784_497791358818178_4079710963698793354_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=ZERfmQbR_2UQ7kNvgEb5p9f&_nc_zt=23&_nc_ht=scontent.fkul3-3.fna&_nc_gid=AHS27lE2CXP1B7bdLyCnQ3K&oh=00_AYAvLLv2nA8Tcz8Ab4ICjuKd7fbTnF5X5Npohj025beT8w&oe=67768609',
  '/placeholder.svg?height=200&width=1000&text=Nightlife+Scene',
  '/placeholder.svg?height=200&width=1000&text=Cocktail+Bar',
  '/placeholder.svg?height=200&width=1000&text=Live+Music',
  '/placeholder.svg?height=200&width=1000&text=Dance+Club',
].filter(Boolean)

export function HomeBanner() {
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
    <div 
      className="relative w-full h-[500px] overflow-hidden"
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
  )
}

