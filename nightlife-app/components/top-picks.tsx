'use client'

import { useState, useRef, useEffect } from 'react'
import { Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const venues = [
  {
    id: 1,
    name: 'Empire KTV',
    type: 'KTV Nightclub',
    image: '/placeholder.svg?height=400&width=600',
    rating: 4,
    reviews: 16,
    price: '$$$$$',
    minSpend: '$78/tower',
    location: 'Orchard',
    hours: '3:00pm - 11:00pm',
    distance: '0.2KM',
    discount: '10% OFF',
  },
  {
    id: 2,
    name: 'Neon Lounge',
    type: 'Cocktail Bar',
    image: '/placeholder.svg?height=400&width=600',
    rating: 4.5,
    reviews: 32,
    price: '$$$$',
    minSpend: '$50/person',
    location: 'Clarke Quay',
    hours: '6:00pm - 2:00am',
    distance: '0.5KM',
    discount: '15% OFF',
  },
  {
    id: 3,
    name: 'Rhythm & Booze',
    type: 'Live Music Bar',
    image: '/placeholder.svg?height=400&width=600',
    rating: 4.2,
    reviews: 28,
    price: '$$$',
    minSpend: '$40/person',
    location: 'Boat Quay',
    hours: '5:00pm - 1:00am',
    distance: '0.8KM',
    discount: '5% OFF',
  },
  {
    id: 4,
    name: 'Sky High',
    type: 'Rooftop Bar',
    image: '/placeholder.svg?height=400&width=600',
    rating: 4.7,
    reviews: 45,
    price: '$$$$$',
    minSpend: '$60/person',
    location: 'Marina Bay',
    hours: '4:00pm - 2:00am',
    distance: '1.2KM',
    discount: '20% OFF',
  },
  {
    id: 5,
    name: 'The Speakeasy',
    type: 'Hidden Bar',
    image: '/placeholder.svg?height=400&width=600',
    rating: 4.6,
    reviews: 39,
    price: '$$$$',
    minSpend: '$45/person',
    location: 'Chinatown',
    hours: '7:00pm - 3:00am',
    distance: '0.7KM',
    discount: '10% OFF',
  },
]

export function TopPicks() {
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
      <div className="space-y-1">
        <p className="text-amber-500 text-sm">Trending Hotspots Right Now</p>
        <h2 className="text-2xl font-bold">EXPLORE TOP PICKS</h2>
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
          <div key={venue.id} className="flex-none w-[300px] snap-start">
            <div className="bg-zinc-900 rounded-lg overflow-hidden">
              <div className="relative">
                <span className="absolute top-2 right-2 bg-white/90 text-black text-xs px-2 py-1 rounded-full">
                  {venue.distance}
                </span>
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-purple-600 text-white text-sm px-3 py-1 rounded-lg">
                  {venue.discount}
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{venue.name}</h3>
                    <p className="text-sm text-zinc-400">{venue.type}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-amber-500">{'★'.repeat(Math.floor(venue.rating))}{'☆'.repeat(5 - Math.floor(venue.rating))}</span>
                      <span className="text-sm text-zinc-400 ml-1">
                        ({venue.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-zinc-800 rounded-full">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-zinc-800 rounded-full">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-amber-500">Price: {venue.price}</span> •{' '}
                    <span>Drinks Min Spend: {venue.minSpend}</span>
                  </p>
                  <p className="text-sm text-zinc-400">
                    @ {venue.location} • {venue.hours}
                  </p>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  MAKE A BOOKING
                </Button>
                <div className="flex gap-4 text-sm">
                  <button className="text-purple-400 hover:text-purple-300">
                    SEE PROMOTION
                  </button>
                  <button className="text-purple-400 hover:text-purple-300">
                    SEE EVENT
                  </button>
                </div>
              </div>
            </div>
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
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
            style={{ display: scrollPosition < (scrollRef.current?.scrollWidth ?? 0) - (scrollRef.current?.clientWidth ?? 0) ? 'block' : 'none' }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      }
    </section>
  )
}

