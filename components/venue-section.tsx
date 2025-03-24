'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { VenueCard } from './venue-card'

interface VenueCategory {
  id: number;
  name: string;
  image: string;
  slug?: string;
}

export function VenueSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [venues, setVenues] = useState<VenueCategory[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    fetch('https://chat.innov8sion.com/api/venue-categories/details/')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch categories')
        return response.json()
      })
      .then(data => {
        // Using the same slug format as the category page
        setVenues(data.map((venue: VenueCategory) => ({
          ...venue,
          slug: venue.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        })))
        setError(null)
      })
      .catch(error => {
        console.error('Error fetching venues:', error)
        setError('Failed to load venue categories')
      })
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(container.scrollLeft + scrollAmount)
    }
  }

  if (error) {
    return (
      <section className="space-y-4 relative">
        <div className="space-y-1 text-center">
          <p className="text-red-500 text-base">{error}</p>
        </div>
      </section>
    )
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
          <div key={venue.id} className="flex-none w-[160px] snap-start">
            <VenueCard
              title={venue.name}
              image={venue.image}
              slug={venue.slug}
            />
          </div>
        ))}
      </div>
      {venues.length > 0 && (
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
      )}
    </section>
  )
}
