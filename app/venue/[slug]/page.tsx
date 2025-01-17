'use client'

import { useState } from 'react'
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

export default function VenueDetailsPage({ params }: VenueDetailsPageProps) {
  const recommendedFor = ['Beer', 'Hot Babes', 'Karaoke', 'Liquor', 'Pool Table']
  const languages = ['China', 'Vietnam']
  const [activeTab, setActiveTab] = useState<Tab>('damage')
  const router = useRouter()
  
  const minimumTips = [
    { time: '3:00pm-9:00pm', price: '$50' },
    { time: '7:00pm-11:00pm', price: '$50' },
    { time: '9:00pm-2:00am', price: '$100' },
    { time: '11:00pm-3:00am', price: '$100' },
  ]
  
  // You can use the slug to fetch venue data from an API
  // For now we'll use static data
  const venue = {
    name: 'Empire KTV',
    category: 'KTV Nightclub',
    rating: 4,
    reviews: 16,
    location: 'Orchard',
    price: '$$$$$',
    minSpend: '$78/tower',
    address: '150 Orchard Rd, #05-20 Orchard Plaza, Singapore 238841',
    hours: {
      happy: '3:00pm-9:00pm; 7:00pm-11:00pm',
      night: '9:00pm-2:00am; 11:00pm-3:00am'
    }
  }

  return (
    <main className="min-h-screen bg-black pb-20">
      {/* Breadcrumb */}
      <div className="px-4 py-2 text-sm text-zinc-400">
        <Link href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/category/ktv-nightclub">Category</Link>
        <span className="mx-2">/</span>
        <Link href="/category/ktv-nightclub">KTV Nightclub</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Empire KTV</span>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] w-full">
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-sm px-3 py-1 rounded-lg z-10">
          10% OFF
        </div>
        <Image
          src="/placeholder.svg?height=400&width=800&text=Empire+KTV"
          alt="Empire KTV"
          fill
          className="object-cover"
        />
      </div>

      {/* Venue Header */}
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{venue.name}</h1>
            <div className="inline-block px-3 py-1 bg-[#630330] rounded-full text-sm mt-2">
              {venue.category}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-2 hover:bg-zinc-800 rounded-full">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-zinc-800 rounded-full">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-yellow-300">{'★'.repeat(venue.rating)}</span>
            <span className="text-zinc-400">{'☆'.repeat(5 - venue.rating)}</span>
          </div>
          <span className="text-sm text-zinc-400">{venue.rating} ({venue.reviews} reviews)</span>
          <span className="text-sm text-zinc-400">• {venue.location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div>
            <span className="text-[#FFA500]">Price: {venue.price}</span>
          </div>
          <div>
            <span className="text-[#FFA500]">Drinks Min Spend: {venue.minSpend}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="link" className="text-pink-500 p-0 h-auto">
            SEE PROMOTION
          </Button>
          <Button variant="link" className="text-pink-500 p-0 h-auto">
            SEE EVENT
          </Button>
        </div>

        <div className="space-y-3 py-2">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-zinc-400 shrink-0" />
            <p className="text-xs text-gray-400">Address</p>
            <p className="text-sm">{venue.address}</p>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-zinc-400 shrink-0" />
            <div className="text-sm space-y-1">
              <p className="text-xs text-gray-400">Opening Hours</p>
              <p><span className="font-bold">Happy Hours:</span> {venue.hours.happy}</p>
              <p><span className="font-bold">Night Hour:</span> {venue.hours.night}</p>
            </div>
          </div>
        </div>
        {/* Recommended For */}
        <div className="space-y-3 pb-8">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">★</span>
            <span className="font-medium">Recommended For</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendedFor.map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-[#630330] text-white rounded-full text-sm"
              >
                {item}
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
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 bg-[#630330] text-white rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 w-24">Playability</span>
            <span>:</span>
            <span>Medium - High</span>
          </div>
          <div className="flex items-start gap-2 pb-4">
            <span className="text-zinc-400 w-24">Minimum Tips</span>
            <span>:</span>
            <div className="space-y-1">
              <div className="font-medium">Mon - Sat</div>
              {minimumTips.map((tip) => (
                <div key={tip.time} className="text-sm">
                  {tip.time} ({tip.price})
                </div>
              ))}
            </div>
          </div>
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
              className={`flex-1 py-3 text-sm font-medium relative ${
                activeTab === tab.id ? 'text-pink-500' : 'text-zinc-400'
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
        {activeTab === 'damage' && <VenueInfo />}
        {activeTab === 'menu' && <VenueMenu />}
        {activeTab === 'photos' && <VenuePhotos />}
        {activeTab === 'review' && <VenueReviews />}
      </div>

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

