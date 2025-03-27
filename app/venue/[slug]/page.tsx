'use client'

import { useState, useEffect } from 'react'
import { Heart, Share2, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VenueInfo } from '@/components/venue-info'
import { VenueMenu } from '@/components/venue-menu'
import { VenuePhotos } from '@/components/venue-photos'
import { VenueReviews } from '@/components/venue-reviews'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Tab = 'damage' | 'menu' | 'photos' | 'review'

interface VenueDetailsPageProps {
  params: {
    slug: string
  }
}

interface VenueData {
  id: number
  image: string
  name: string
  drink_dollars: number
  categories: Array<{ id: number; name: string }>
  districts: Array<{ id: number; name: string }>
  activities: Array<{ id: number; name: string; icon: string }>
  price: number
  min_spend: number
  venue_address: string
  languages_full: string[]
  rating: number
  review_count: number
  opening_hours: Array<{
    id: number
    header: string
    timings: Array<{ id: number; timing: string }>
  }>
  about_sections: Array<{
    id: number
    header: string
    html_content: string
  }>
  slug: string
  damage_sections: Array<{
    id: number
    line_items: Array<{
      id: number
      header: string
      no_of_pax: number
      min_spend: number
      nested_items: Array<{
        id: number
        session: string
        text: string
      }>
    }>
  }>
  menu_sections: Array<{
    id: number
    header: string
    menu_items: Array<{
      id: number
      name: string
      description: string
      price: number
    }>
  }>
  menu_image_sections: Array<{
    id: number
    header: string
    images: Array<{
      id: number
      image: string
    }>
  }>
  gallery_sections: Array<{
    id: number
    random_image_count: number
    images: {
      fixed: Array<{
        id: number
        image: string
        sequence: number
      }>
      random: Array<{
        id: number
        image: string
        sequence: null
      }>
    }
  }>
  promotion_images: Array<{
    id: number
    image: string
  }>
  event_images: Array<{
    id: number
    image: string
  }>
}

function VenueDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-black pb-20">
      {/* Breadcrumb */}
      <div className="px-4 py-2">
        <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse" />
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] w-full bg-zinc-800 animate-pulse" />

      {/* Venue Header */}
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse" />
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-zinc-800 rounded-full animate-pulse" />
              <div className="h-6 w-20 bg-zinc-800 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-10 bg-zinc-800 rounded-full animate-pulse" />
            <div className="h-10 w-10 bg-zinc-800 rounded-full animate-pulse" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-32 bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
        </div>

        <div className="flex items-center gap-4">
          <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
          <div className="h-4 w-36 bg-zinc-800 rounded animate-pulse" />
        </div>

        <div className="flex gap-4">
          <div className="h-6 w-28 bg-zinc-800 rounded animate-pulse" />
          <div className="h-6 w-28 bg-zinc-800 rounded animate-pulse" />
        </div>

        <div className="space-y-3 py-2">
          <div className="flex items-start gap-3">
            <div className="h-5 w-5 bg-zinc-800 rounded animate-pulse" />
            <div className="h-4 w-64 bg-zinc-800 rounded animate-pulse" />
          </div>
          <div className="flex items-start gap-3">
            <div className="h-5 w-5 bg-zinc-800 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-64 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Recommended For */}
        <div className="space-y-3 pb-8">
          <div className="h-6 w-36 bg-zinc-800 rounded animate-pulse" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-24 bg-zinc-800 rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* About Us */}
      <div className="p-4 space-y-4 bg-zinc-900">
        <div className="h-8 w-32 bg-zinc-800 rounded animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-64 bg-zinc-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4 border-b border-zinc-800">
        <div className="h-8 w-32 bg-zinc-800 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 bg-zinc-800 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-zinc-800 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Fixed Booking Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t border-zinc-800">
        <div className="h-12 bg-zinc-800 rounded animate-pulse" />
      </div>
    </main>
  )
}

export default function VenueDetailsPage({ params }: VenueDetailsPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('damage')
  const [venueData, setVenueData] = useState<VenueData | null>(null)
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const router = useRouter()

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        const response = await fetch(`https://chat.innov8sion.com/api/venues/${params.slug}/`)
        const data = await response.json()
        setVenueData(data)
      } catch (error) {
        console.error('Error fetching venue data:', error)
      }
    }

    fetchVenueData()
  }, [params.slug, router])

  // useEffect(() => {
  //   if (!isPromotionModalOpen || (venueData?.promotion_images.length ?? 0) <= 1) return;
  //   const interval = setInterval(() => {
  //     setCurrentPromoIndex((prev) =>
  //       prev === (venueData?.promotion_images.length ?? 1) - 1 ? 0 : prev + 1
  //     );
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [isPromotionModalOpen, venueData])

  // useEffect(() => {
  //   if (!isEventModalOpen || (venueData?.event_images.length ?? 0) <= 1) return;
  //   const interval = setInterval(() => {
  //     setCurrentEventIndex((prev) =>
  //       prev === (venueData?.event_images.length ?? 1) - 1 ? 0 : prev + 1
  //     );
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [isEventModalOpen, venueData])

  if (!venueData) {
    return <VenueDetailsSkeleton />
  }

  return (
    <main className="min-h-screen bg-black pb-20">
      {/* Breadcrumb */}
      <div className="px-4 py-2 text-sm text-zinc-400 flex flex-wrap gap-1 items-center">
        <Link href="/" className="underline hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/category/ktv-nightclub" className="underline hover:text-white">Category</Link>
        <span>/</span>
        <Link href={`/category/ktv-nightclub`} className="underline hover:text-white">
          {venueData.categories[0]?.name}
        </Link>
        <span>/</span>
        <span className="text-white">{venueData.name}</span>
      </div>


      {/* Hero Image */}
      <div className="relative aspect-[16/9] w-full">
        <div className="absolute bottom-2 right-5 bg-gradient-to-r from-[#512e8d] to-[#7254c4]  text-white text-sm px-4 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
          <span className="font-bold text-xl">{venueData.drink_dollars}%</span>
          <img
            src="/coin.png" // 🔁 Replace with actual coin icon path
            alt="Coin"
            className="w-3.5 h-3.5"
          />
        </div>
        <Image
          src={venueData.image}
          alt={venueData.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Venue Header */}
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{venueData.name}</h1>
            <div className="flex flex-wrap gap-2 mt-1">
              {venueData.categories.map(category => (
                <div key={category.id} className="bg-[#321623] text-gray-300 rounded-xl inline-block px-3 py-1 text-xs">
                  {category.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-2 hover:bg-zinc-800 rounded-full">
              <Heart className="w-6 h-6 text-gray-300" />
            </button>
            <button className="p-2 hover:bg-zinc-800 rounded-full">
              <Share2 className="w-6 h-6 text-gray-300" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-yellow-300">{'★'.repeat(Math.floor(venueData.rating))}</span>
            <span className="text-zinc-400">{'☆'.repeat(5 - Math.floor(venueData.rating))}</span>
          </div>
          <span className="text-sm text-zinc-400">{venueData.rating} ({venueData.review_count} reviews)</span>
          <span className="text-sm text-zinc-400">• {venueData.districts[0]?.name}</span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-[#FFA500]">Price: {'$'.repeat(Math.floor(venueData.price / 10))}</span>
          </div>
          <div>
            <span className="text-[#FFA500]">Drinks Min Spend: ${venueData.min_spend}</span>
          </div>
        </div>

        {/* ... existing venue content ... */}
        <div className="flex gap-4">
          <Button variant="link" className="underline text-pink-500 p-0 h-auto" onClick={() => { setCurrentPromoIndex(0); setIsPromotionModalOpen(true); }}>
            SEE PROMOTION
          </Button>
          <Button variant="link" className="underline text-pink-500 p-0 h-auto" onClick={() => { setCurrentEventIndex(0); setIsEventModalOpen(true); }}>
            SEE EVENT
          </Button>
        </div>


        <div className="space-y-3 py-2">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-zinc-400 shrink-0" />
            <p className="text-xs text-gray-400">Address</p>
            <p className="text-sm">{venueData.venue_address}</p>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-zinc-400 shrink-0" />
            <div className="text-sm space-y-1">
              <p className="text-xs text-gray-400">Opening Hours</p>
              {venueData.opening_hours.map(hours => (
                <p key={hours.id}>
                  <span className="font-bold">{hours.header}:</span>{' '}
                  {hours.timings.map(t => t.timing).join(', ')}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended For */}
        <div className="space-y-3 pb-8">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">★</span>
            <span className="text-xs text-gray-400">Recommended For</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {venueData.activities.map((activity) => (
              <span
                key={activity.id}
                className="px-3 py-1 bg-[#321623] text-gray-300 rounded-full text-sm"
              >
                {activity.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* About Us */}
      <div className="p-4 space-y-4 bg-zinc-900">
        <h2 className="text-xl font-bold pt-4">About Us</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 w-24">Language</span>
            <span>:</span>
            <div className="flex gap-2">
              {venueData.languages_full.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 bg-[#321623] text-gray-300 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
          {venueData.about_sections.map(section => (
            <div key={section.id} className="flex items-start gap-2">
              <span className="text-zinc-400 w-24">{section.header}</span>
              <span>:</span>
              <div className='text-sm' dangerouslySetInnerHTML={{ __html: section.html_content }} />
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-xl font-bold pt-4">Details</h2>
        <div className="flex">
          {[
            { id: 'damage' as const, label: 'Damage' },
            { id: 'menu' as const, label: 'Menu' },
            { id: 'photos' as const, label: 'Photos' },
            { id: 'review' as const, label: 'Review' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium relative ${activeTab === tab.id ? 'text-pink-500' : 'text-zinc-400'
                }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'damage' && (
          <VenueInfo
            damageSections={venueData.damage_sections}
            openingHours={venueData.opening_hours}
            timings={venueData.timings}
          />
        )}
        {activeTab === 'menu' && <VenueMenu menuSections={venueData.menu_sections} menuImageSections={venueData.menu_image_sections} />}
        {activeTab === 'photos' && <VenuePhotos gallerySections={venueData.gallery_sections} />}
        {activeTab === 'review' && <VenueReviews />}
      </div>
      {/* ... existing sections ... */}

      {isPromotionModalOpen && venueData.promotion_images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={() => setIsPromotionModalOpen(false)}>
          <div className="bg-zinc-900 p-4 rounded-lg w-full max-w-2xl relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-white text-lg" onClick={() => setIsPromotionModalOpen(false)}>✕</button>
            <h3 className="text-center text-lg font-semibold text-white mb-3">Promotions</h3>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
              <img src={venueData.promotion_images[currentPromoIndex].image} alt="Promotion" className="w-full h-full object-cover transition duration-500" />
              <button onClick={() => setCurrentPromoIndex((prev) => prev === 0 ? venueData.promotion_images.length - 1 : prev - 1)} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">←</button>
              <button onClick={() => setCurrentPromoIndex((prev) => prev === venueData.promotion_images.length - 1 ? 0 : prev + 1)} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">→</button>
            </div>
            <div className="flex justify-center mt-3 gap-2">
              {venueData.promotion_images.map((_, i) => (
                <span key={i} className={`w-2 h-2 rounded-full ${i === currentPromoIndex ? 'bg-pink-500' : 'bg-zinc-600'}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {isEventModalOpen && venueData.event_images.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center" onClick={() => setIsEventModalOpen(false)}>
          <div className="bg-zinc-900 p-4 rounded-lg w-full max-w-2xl relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 text-white text-lg" onClick={() => setIsEventModalOpen(false)}>✕</button>
            <h3 className="text-center text-lg font-semibold text-white mb-3">Events</h3>
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
              <img src={venueData.event_images[currentEventIndex].image} alt="Event" className="w-full h-full object-cover transition duration-500" />
              <button onClick={() => setCurrentEventIndex((prev) => prev === 0 ? venueData.event_images.length - 1 : prev - 1)} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">←</button>
              <button onClick={() => setCurrentEventIndex((prev) => prev === venueData.event_images.length - 1 ? 0 : prev + 1)} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">→</button>
            </div>
            <div className="flex justify-center mt-3 gap-2">
              {venueData.event_images.map((_, i) => (
                <span key={i} className={`w-2 h-2 rounded-full ${i === currentEventIndex ? 'bg-pink-500' : 'bg-zinc-600'}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Booking Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t border-zinc-800">
        <Button
          className="w-full bg-gradient-to-r from-[#8E2DE2] to-[#F000FF]"
          onClick={() => router.push(`/venue/${params.slug}/booking`)}
        >
          MAKE A BOOKING
        </Button>
      </div>
    </main>
  )
}
