'use client'

import { useState, useRef, useEffect } from 'react'
import { Heart, Share2, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface District {
  id: number
  name: string
}

interface PromotionImage {
  id: number
  image: string
}

interface EventImage {
  id: number
  image: string
}

interface Category {
  id: number
  name: string
}

interface Venue {
  id: number
  name: string
  slug: string
  image: string
  price: number
  min_spend: string
  districts: District[]
  promotion_images: PromotionImage[]
  event_images: EventImage[]
  drink_dollars: number
  rating: number
  review_count: number
  distance?: number
  categories?: Category[]
}

interface TopPick {
  id: number
  venue: Venue
  sequence: number
}

const formatDistance = (distance: number): string => {
  if (distance < 1) {
    // Less than 1 KM, show in meters
    return `${Math.round(distance * 1000)}M`
  } else if (distance < 10) {
    // Less than 10 KM, show with one decimal
    return `${distance.toFixed(1)}KM`
  } else if (distance >= 1000) {
    // 1000 KM or more, show as xK KM
    return `${(distance / 1000).toFixed(1)}K KM`
  } else {
    // Between 10 and 999 KM, show as whole number
    return `${Math.round(distance)}KM`
  }
}

export function TopPicks() {
  const [topPicks, setTopPicks] = useState<TopPick[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [selectedPromotions, setSelectedPromotions] = useState<PromotionImage[]>([])
  const [selectedEvents, setSelectedEvents] = useState<EventImage[]>([])
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)
  const [currentEventIndex, setCurrentEventIndex] = useState(0);



  // useEffect(() => {
  //   if (!isPromotionModalOpen || selectedPromotions.length <= 1) return;

  //   const interval = setInterval(() => {
  //     setCurrentPromoIndex((prev) =>
  //       prev === selectedPromotions.length - 1 ? 0 : prev + 1
  //     );
  //   }, 3000); // 3 seconds

  //   return () => clearInterval(interval); // Cleanup
  // }, [isPromotionModalOpen, selectedPromotions]);

  // useEffect(() => {
  //   if (!isEventModalOpen || selectedEvents.length <= 1) return;

  //   const interval = setInterval(() => {
  //     setCurrentEventIndex((prev) =>
  //       prev === selectedEvents.length - 1 ? 0 : prev + 1
  //     );
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [isEventModalOpen, selectedEvents]);


  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        console.log('📍 Got location:', coords)
        setLocation(coords)
        setLocationError(null)
      },
      (error) => {
        let errorMessage
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Please enable location access to see nearby venues'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out'
            break
          default:
            errorMessage = 'An unknown error occurred getting your location'
        }
        setLocationError(errorMessage)
        console.error('🚫 Location error:', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }

  const fetchTopPicks = async (lat?: number, lon?: number) => {
    try {
      const url = new URL('https://chat.innov8sion.com/api/top-picks/')
      if (lat && lon) {
        url.searchParams.append('lat', lat.toString())
        url.searchParams.append('lon', lon.toString())
        console.log('🌍 Fetching with coordinates:', { lat, lon })
      } else {
        console.log('🌍 Fetching without coordinates')
      }

      console.log('🔗 API URL:', url.toString())
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch top picks')
      }
      const data = await response.json()
      console.log('📊 Raw API Response:', JSON.stringify(data, null, 2))

      if (!Array.isArray(data)) {
        throw new Error('Invalid response format')
      }

      // Log each venue's distance
      data.forEach((pick: TopPick) => {
        console.log(`📍 Venue "${pick.venue.name}":`, {
          distance: pick.venue.distance,
          typeof_distance: typeof pick.venue.distance,
          has_distance: 'distance' in pick.venue
        })
      })

      setTopPicks(data.sort((a: TopPick, b: TopPick) => (a?.sequence || 0) - (b?.sequence || 0)))
    } catch (error) {
      console.error('❌ Error fetching top picks:', error)
      setTopPicks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getLocation()
    }
  }, [])

  useEffect(() => {
    if (location) {
      fetchTopPicks(location.latitude, location.longitude)
    } else if (locationError) {
      // If there's a location error, fetch without coordinates
      fetchTopPicks()
    }
  }, [location, locationError])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(container.scrollLeft + scrollAmount)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        setScrollPosition(scrollRef.current.scrollLeft)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (loading) {
    return (
      <section className="space-y-4 relative bg-[#121212] px-4 sm:px-6 py-8">
        <div className="space-y-1 text-center">
          <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse mx-auto" />
          <div className="h-8 w-64 bg-zinc-800 rounded animate-pulse mx-auto mt-2" />
        </div>
        <div className="flex space-x-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-none w-[280px] sm:w-[320px] md:w-[350px]">
              <div className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
                <div className="w-full h-48 bg-zinc-800 animate-pulse" />
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="h-6 w-48 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-zinc-800 rounded animate-pulse" />
                  </div>
                  <div className="h-10 w-full bg-zinc-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (!Array.isArray(topPicks) || topPicks.length === 0) {
    return (
      <section className="space-y-4 relative bg-[#121212] px-4 sm:px-6 py-8">
        <div className="space-y-1 text-center">
          <p className="text-[#FFD54A] text-sm font-medium uppercase">
            No Venues Available
          </p>
          <h2 className="text-3xl font-bold text-white font-futura">
            Check Back Later
          </h2>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4 relative bg-[#121212] px-4 sm:px-6 py-8">
      <div className="space-y-1 text-center">
        <p className="text-[#FFD54A] text-sm font-medium uppercase">
          Trending Hotspots Right Now
        </p>
        <h2 className="text-3xl font-bold text-white font-futura">
          EXPLORE TOP PICKS
        </h2>
        {locationError && (
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-zinc-400">
            <MapPin className="w-4 h-4" />
            <p>{locationError}</p>
            <button
              onClick={getLocation}
              className="text-[#FFD54A] hover:underline"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory pl-4 sm:pl-6 pr-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        {topPicks.map((pick) => {
          if (!pick?.venue) return null

          const venue = pick.venue
          const districtNames = venue.districts?.map((d) => d?.name)?.filter(Boolean)?.join(', ') || ''
          const category = venue.categories?.[0]?.name || 'Venue'
          const priceString = '$'.repeat(Math.max(0, Math.min(5, venue.price || 0)))
          const rating = Math.max(0, Math.min(5, Math.floor(venue.rating || 0)))

          return (
            <div key={pick.id} className="flex-none w-[105%] max-w-[400px] snap-start ml-4 first:ml-0">

              <div className="bg-transparent rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  {pick.venue.distance !== undefined && (
                    <span className="absolute top-2 right-5 bg-white/90 text-black text-xs px-2 py-1 rounded-full z-10">
                      {formatDistance(pick.venue.distance)}
                    </span>
                  )}
                  <Link href={`/venue/${venue.slug || ''}`}>
                    <div className="relative w-full h-40 overflow-hidden rounded-lg">
                      <Image
                        src={venue.image || "/placeholder.svg"}
                        alt={venue.name || 'Venue'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="absolute bottom-2 right-5 bg-gradient-to-r from-[#512e8d] to-[#7254c4]  text-white text-sm px-4 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <span className="font-bold text-xl">{venue.drink_dollars}%</span>
                    <img
                      src="/coin.png" // 🔁 Replace with actual coin icon path
                      alt="Coin"
                      className="w-3.5 h-3.5"
                    />
                  </div>

                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link href={`/venue/${venue.slug || ''}`}>
                        <h3 className="text-md font-bold text-white">{venue.name || 'Unnamed Venue'}</h3>
                      </Link>
                      {venue.categories?.map((cat) => (
                        <p key={cat.id} className="text-[10px] bg-[#321623] rounded-xl px-2 py-0.5 inline-block mt-1 text-gray-300">
                          {cat.name}
                        </p>
                      ))}
                    </div>
                    <div className="flex gap-0">
                      <button className="p-2 hover:bg-zinc-800 rounded-full">
                        <Heart className="w-4 h-4 text-gray-300" />
                      </button>
                      <button className="p-2 hover:bg-zinc-800 rounded-full">
                        <Share2 className="w-4 h-4 text-gray-300" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-amber-500">
                        Price: {priceString || '$'}
                      </span>{" "}
                      • <span className="text-amber-500">Drinks Min Spend: {venue.min_spend || 'N/A'}</span>
                    </p>
                    <p className="text-sm text-zinc-400">
                      {districtNames ? `@ ${districtNames}` : 'Location TBA'} {venue.hours ? ` • ${venue.hours}` : ''}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-300">
                        {"★".repeat(rating)}
                        {"☆".repeat(5 - rating)}
                      </span>
                      <span className="text-sm text-zinc-400 ml-1">
                        {venue.rating?.toFixed(1) || '0.0'} ({venue.review_count || 0} reviews)
                      </span>
                    </div>
                  </div>
                  <Link href={`/venue/${venue.slug || ''}`}>
                    <Button className="w-full bg-gradient-to-r from-[#8E2DE2] to-[#F000FF] text-white font-medium py-2 rounded-lg">
                      MAKE A BOOKING
                    </Button>
                  </Link>
                  <div className="flex gap-4 text-sm">
                    {venue.promotion_images.length > 0 && (
                      <button
                        onClick={() => {
                          setSelectedPromotions(venue.promotion_images);
                          setCurrentPromoIndex(0)
                          setIsPromotionModalOpen(true);
                        }}
                        className="text-[#DE3163] underline"
                      >
                        SEE PROMOTION
                      </button>
                    )}
                    {venue.event_images.length > 0 && (
                      <button
                        onClick={() => {
                          setSelectedEvents(venue.event_images);
                          setCurrentPromoIndex(0)
                          setIsEventModalOpen(true);
                        }}
                        className="text-[#DE3163] underline"
                      >
                        SEE EVENT
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
        style={{
          display: scrollPosition > 0 ? "block" : "none",
        }}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>


      {/* <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
        style={{
          display:
            scrollPosition <
              (scrollRef.current?.scrollWidth ?? 0) -
              (scrollRef.current?.clientWidth ?? 0)
              ? "block"
              : "none",
        }}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button> */}


      {/* 🔥 Promotion Modal with Slideshow */}
      {isPromotionModalOpen && selectedPromotions.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={() => setIsPromotionModalOpen(false)}>
          <div className="bg-zinc-900 p-4 rounded-lg w-full max-w-2xl relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-3 right-3 text-white text-lg"
              onClick={() => setIsPromotionModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-center text-lg font-semibold text-white mb-3">Promotions</h3>

            {/* Slideshow */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
              <img
                src={selectedPromotions[currentPromoIndex].image}
                alt="Promotion"
                className="w-full h-full object-cover transition duration-500"
              />

              {/* Left Arrow */}
              {selectedPromotions.length > 1 && (
                <button
                  onClick={() =>
                    setCurrentPromoIndex((prev) =>
                      prev === 0 ? selectedPromotions.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  ←
                </button>
              )}

              {/* Right Arrow */}
              {selectedPromotions.length > 1 && (
                <button
                  onClick={() =>
                    setCurrentPromoIndex((prev) =>
                      prev === selectedPromotions.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  →
                </button>
              )}
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-3 gap-2">
              {selectedPromotions.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === currentPromoIndex ? 'bg-pink-500' : 'bg-zinc-600'}`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* event modal  */}
      {isEventModalOpen && selectedEvents.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={() => setIsEventModalOpen(false)}>
          <div className="bg-zinc-900 p-4 rounded-lg w-full max-w-2xl relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-3 right-3 text-white text-lg"
              onClick={() => setIsEventModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-center text-lg font-semibold text-white mb-3">Events</h3>

            {/* Slideshow */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
              <img
                src={selectedEvents[currentEventIndex].image}
                alt="Event"
                className="w-full h-full object-cover transition duration-500"
              />

              {/* Left Arrow */}
              {selectedEvents.length > 1 && (
                <button
                  onClick={() =>
                    setCurrentEventIndex((prev) =>
                      prev === 0 ? selectedEvents.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  ←
                </button>
              )}

              {/* Right Arrow */}
              {selectedEvents.length > 1 && (
                <button
                  onClick={() =>
                    setCurrentEventIndex((prev) =>
                      prev === selectedEvents.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  →
                </button>
              )}
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-3 gap-2">
              {selectedEvents.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === currentEventIndex ? 'bg-pink-500' : 'bg-zinc-600'}`}
                ></span>
              ))}

            </div>
          </div>
        </div>
      )}


    </section>

  )
}
