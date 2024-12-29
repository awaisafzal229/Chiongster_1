'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Sample data for all categories in "Pick Your Place"
const venues = [
  {
    id: 1,
    name: 'Empire KTV',
    type: 'KTV Nightclub',
    categories: ['ktv-nightclub'],
    image: '/placeholder.svg?height=400&width=600&text=Empire+KTV',
    rating: 4,
    reviews: 16,
    price: '$$$$$',
    minSpend: '$78/tower',
    location: 'Orchard',
    hours: '3:00pm - 11:00pm',
    distance: '0.2KM',
    discount: '10% OFF',
    tags: ['KTV Nightclub']
  },
  {
    id: 2,
    name: 'Marquee',
    type: 'Thai Disco',
    categories: ['thai-disco', 'boys-club'],
    image: '/placeholder.svg?height=400&width=600&text=Marquee',
    rating: 4,
    reviews: 10,
    price: '$$$$$',
    minSpend: '$78/tower',
    location: 'Bugis',
    hours: '4:00pm - 3:00am',
    distance: '0.2KM',
    discount: '10% OFF',
    tags: ['Thai Disco', 'Boys Club']
  },
  {
    id: 3,
    name: 'The Pub',
    type: 'Pub',
    categories: ['pub'],
    image: '/placeholder.svg?height=400&width=600&text=The+Pub',
    rating: 4.5,
    reviews: 32,
    price: '$$$',
    minSpend: '$40/person',
    location: 'Clarke Quay',
    hours: '5:00pm - 2:00am',
    distance: '0.5KM',
    discount: '15% OFF',
    tags: ['Pub']
  },
  {
    id: 4,
    name: 'Lounge & Chill',
    type: 'Lounge & Bar',
    categories: ['lounge-and-bar'],
    image: '/placeholder.svg?height=400&width=600&text=Lounge+%26+Chill',
    rating: 4.2,
    reviews: 24,
    price: '$$$$',
    minSpend: '$50/person',
    location: 'Marina Bay',
    hours: '6:00pm - 3:00am',
    distance: '0.8KM',
    discount: '5% OFF',
    tags: ['Lounge', 'Bar']
  },
  {
    id: 5,
    name: 'Family Sing-Along',
    type: 'Family KTV',
    categories: ['family-ktv'],
    image: '/placeholder.svg?height=400&width=600&text=Family+Sing-Along',
    rating: 4.3,
    reviews: 45,
    price: '$$',
    minSpend: '$30/person',
    location: 'Tampines',
    hours: '12:00pm - 10:00pm',
    distance: '1.2KM',
    tags: ['Family KTV']
  },
]

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const categoryName = params.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  const filteredVenues = venues.filter(venue => 
    params.slug === 'all' ? true : venue.categories.includes(params.slug)
  )

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-zinc-400 mb-4">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span>Category</span>
        <span className="mx-2">/</span>
        <span className="text-white">{categoryName}</span>
      </div>

      {/* Category Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">{categoryName}</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Sort by</span>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[160px] bg-zinc-900/90 border-zinc-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Venues List */}
      <div className="space-y-4">
        {filteredVenues.map((venue) => (
          <div key={venue.id} className="bg-zinc-900 rounded-lg overflow-hidden">
            <div className="relative">
              <span className="absolute top-2 right-2 bg-white/90 text-black text-xs px-2 py-1 rounded-full">
                {venue.distance}
              </span>
              <img
                src={venue.image}
                alt={venue.name}
                className="w-full h-48 object-cover"
              />
              {venue.discount && (
                <div className="absolute bottom-2 right-2 bg-purple-600 text-white text-sm px-3 py-1 rounded-lg">
                  {venue.discount}
                </div>
              )}
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{venue.name}</h3>
                  <div className="flex gap-2 mt-1">
                    {venue.tags.map((tag) => (
                      <span key={tag} className="text-xs text-amber-500">{tag}</span>
                    ))}
                  </div>
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
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button className="p-2 hover:bg-zinc-800 rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`w-8 h-8 rounded-full ${
              currentPage === page 
                ? 'bg-purple-600 text-white' 
                : 'text-zinc-400 hover:bg-zinc-800'
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button className="p-2 hover:bg-zinc-800 rounded-full">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

