'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { VenueCard } from './venue-card'

const venues = [
  { 
    title: 'Pub', 
    image: '/placeholder.svg?height=150&width=300&text=Pub',
    slug: 'pub'
  },
  { 
    title: 'Lounge & Bar', 
    image: '/placeholder.svg?height=150&width=300&text=Lounge+%26+Bar',
    slug: 'lounge-and-bar'
  },
  { 
    title: 'KTV Nightclub', 
    image: '/placeholder.svg?height=150&width=300&text=KTV+Nightclub',
    slug: 'ktv-nightclub'
  },
  { 
    title: 'Boys Club', 
    image: '/placeholder.svg?height=150&width=300&text=Boys+Club',
    slug: 'boys-club'
  },
  { 
    title: 'Flower Joint', 
    image: '/placeholder.svg?height=150&width=300&text=Flower+Joint',
    slug: 'flower-joint'
  },
  { 
    title: 'Thai Disco', 
    image: '/placeholder.svg?height=150&width=300&text=Thai+Disco',
    slug: 'thai-disco'
  },
  { 
    title: 'Family KTV', 
    image: '/placeholder.svg?height=150&width=300&text=Family+KTV',
    slug: 'family-ktv'
  },
].filter(venue => venue.image)

export function VenueSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(container.scrollLeft + scrollAmount)
    }
  }

  return (
    <section className="space-y-4 relative">
      <div className="space-y-1 text-center">
        <p className="text-[#FFD54A] text-base font-medium">Find Your Venue</p>
        <h2 className="text-3xl font-bold text-white font-futura">PICK YOUR PLACE</h2>
      </div>
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory' 
        }}
      >
        {venues.map((venue) => (
          <div key={venue.title} className="flex-none w-[250px] snap-start">
            <VenueCard
              title={venue.title}
              image={venue.image}
              slug={venue.slug}
            />
          </div>
        ))}
      </div>
      {
        <>
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
            style={{ display: scrollPosition > 0 ? 'block' : 'none' }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
            style={{ display: scrollPosition < (scrollRef.current?.scrollWidth ?? 0) - (scrollRef.current?.clientWidth ?? 0) ? 'block' : 'none' }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      }
    </section>
  )
}

