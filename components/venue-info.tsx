'use client'

import { useState, useRef } from 'react'
import { Martini, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function VenueInfo() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const rooms = [
    {
      type: 'S Room',
      pax: '1-3 pax',
      minSpend: '2 Tower / 1 Bottle',
      hours: [
        { type: 'Happy Hour', price: '3 tower ($156/$216)' },
        { type: 'Night Hour', price: '2 tower ($236)' },
        { type: 'Morning Hour', price: '2 tower ($256)' },
      ],
    },
    {
      type: 'M Room',
      pax: '3-5 pax',
      minSpend: '3 Tower / 2 Bottle',
      hours: [
        { type: 'Happy Hour', price: '3 tower ($248/$328)' },
        { type: 'Night Hour', price: '3 tower ($358/$388)' },
        { type: 'Morning Hour', price: '3 tower ($418)' },
      ],
    },
    {
      type: 'L Room',
      pax: '5-7 pax',
      minSpend: '6 Tower / 3 Bottle',
      hours: [
        { type: 'Happy Hour', price: '6 tower ($xxx)' },
        { type: 'Night Hour', price: '6 tower ($xxx)' },
        { type: 'Morning Hour', price: '6 tower ($xxx)' },
      ],
    },
  ]

  const openingHours = [
    { day: 'Monday', hours: '3:00pm - 6:00am' },
    { day: 'Tuesday', hours: '3:00pm - 6:00am' },
    { day: 'Wednesday', hours: '3:00pm - 6:00am' },
    { day: 'Thursday', hours: '3:00pm - 6:00am' },
    { day: 'Friday', hours: '3:00pm - 6:00am' },
    { day: 'Saturday', hours: '3:00pm - 6:00am' },
    { day: 'Sunday', hours: '8:00pm - 6:00am' },
  ]

  const redeemableItems = [
    {
      id: '1',
      name: '1 Can Beer',
      brand: 'Tiger',
      price: 15,
      image: '/placeholder.svg?height=120&width=120&text=Tiger+Can'
    },
    {
      id: '2',
      name: '1 Tower Beer',
      brand: 'Tiger',
      price: 50,
      image: '/placeholder.svg?height=120&width=120&text=Tiger+Tower'
    },
    {
      id: '3',
      name: '1 Bottle',
      brand: 'Heineken',
      price: 45,
      image: '/placeholder.svg?height=120&width=120&text=Heineken'
    },
    {
      id: '4',
      name: '1 Tower Beer',
      brand: 'Carlsberg',
      price: 48,
      image: '/placeholder.svg?height=120&width=120&text=Carlsberg'
    }
  ]

  const similarPlaces = [
    {
      id: '1',
      name: 'CATWALK KTV',
      type: 'KTV Nightclub',
      distance: '0.5 KM',
      image: '/placeholder.svg?height=150&width=150&text=CATWALK+KTV'
    },
    {
      id: '2',
      name: 'SUPREME KTV',
      type: 'KTV Nightclub',
      distance: '0.8 KM',
      image: '/placeholder.svg?height=150&width=150&text=SUPREME+KTV'
    },
    {
      id: '3',
      name: 'ELITE KTV',
      type: 'KTV Nightclub',
      distance: '1.2 KM',
      image: '/placeholder.svg?height=150&width=150&text=ELITE+KTV'
    }
  ]

  const nearbyPlaces = [
    {
      id: '1',
      name: 'DE DIAMONDS',
      type: 'Club',
      distance: '0.010 km',
      image: '/placeholder.svg?height=150&width=150&text=DE+DIAMONDS'
    },
    {
      id: '2',
      name: 'CLUB LUNAR',
      type: 'Club',
      distance: '0.041 km',
      image: '/placeholder.svg?height=150&width=150&text=CLUB+LUNAR'
    }
  ]

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(container.scrollLeft + scrollAmount)
    }
  }

  return (
    <div className="space-y-8">
      {/* Room Types */}
      <div className="space-y-4">
        {rooms.map((room) => (
          <div
            key={room.type}
            className="bg-zinc-900 rounded-lg p-4 space-y-4"
          >
            <h3 className="font-medium">{room.type}</h3>
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400"><Users /></span>
                <span className="font-bold">No. of Pax:</span> {room.pax}
              </div>
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400"><Martini /></span>
                <span className="font-bold">Min Spend:</span> {room.minSpend}
              </div>
            </div>
            <div className="space-y-2">
              {room.hours.map((hour) => (
                <div
                  key={hour.type}
                  className="grid grid-cols-3 gap-3 text-sm"
                >
                  <span className="text-zinc-400">{hour.type}</span>
                  <span className="col-span-2">{hour.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Opening Hours Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Clock className="w-6 h-6" />
          Opening Hours
        </h2>
        <div className="bg-zinc-900 rounded-lg p-4">
          <div className="space-y-2">
            {openingHours.map((day) => (
              <div key={day.day} className="grid grid-cols-3 gap-3 text-sm">
                <span className="text-zinc-400">{day.day}</span>
                <span className="col-span-2">: {day.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Redeemable Items Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Redeemable Items</h2>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            }}
          >
            {redeemableItems.map((item) => (
              <div key={item.id} className="flex-none w-[200px] snap-start">
                <div className="bg-zinc-900 rounded-lg p-4 space-y-3">
                  <div className="aspect-square relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-zinc-400">{item.brand}</p>
                    <p className="text-amber-500 font-bold flex items-center justify-center gap-1">
                      {item.price}
                      <span className="text-lg">💰</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            style={{
              display:
                scrollPosition <
                (scrollRef.current?.scrollWidth ?? 0) - (scrollRef.current?.clientWidth ?? 0)
                  ? 'block'
                  : 'none'
            }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
        <p className="text-xs text-zinc-500">
          * Min spend is required for booking and redeeming of item. See{' '}
          <Link href="/terms" className="text-pink-500 hover:underline">
            terms and conditions
          </Link>
        </p>
      </div>

      {/* Similar Places Section */}
      <div className="space-y-4 pt-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="similar-places" className="border-none">
            <AccordionTrigger className="hover:no-underline py-0">
              <h2 className="text-base">Similar Places</h2>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-4">
                {similarPlaces.map((place) => (
                  <Link 
                    key={place.id} 
                    href="#"
                    className="block w-full text-[#DE3163] text-sm hover:text-[#DE3163]/90"
                  >
                    {place.name}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Nearby Places Section */}
      <div className="space-y-4 pb-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="nearby-places" className="border-none">
            <AccordionTrigger className="hover:no-underline py-0">
              <h2 className="text-base">Nearby Places</h2>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-4">
                {nearbyPlaces.map((place) => (
                  <Link 
                    key={place.id} 
                    href="#"
                    className="block w-full text-[#DE3163] text-sm hover:text-[#DE3163]/90"
                  >
                    {place.name}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

