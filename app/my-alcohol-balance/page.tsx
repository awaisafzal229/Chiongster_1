'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarIcon, Plus, MapPin } from 'lucide-react'
import { Footer } from '@/components/footer'

interface AlcoholItem {
  id: string
  name: string
  quantity: number
  expiryDate: string
  location: string
  image: string
  status: 'active' | 'expiring' | 'expired'
}

const alcoholItems: AlcoholItem[] = [
  {
    id: '1',
    name: '12 cans of Tiger Beer',
    quantity: 1,
    expiryDate: 'Sun, 16 Sep 2024',
    location: 'Empire KTV',
    image: '/placeholder.svg?height=80&width=80&text=Tiger+Beer',
    status: 'active'
  },
  {
    id: '2',
    name: '12 cans of Tiger Beer',
    quantity: 1,
    expiryDate: 'Sun, 16 Sep 2024',
    location: 'Empire KTV',
    image: '/placeholder.svg?height=80&width=80&text=Tiger+Beer',
    status: 'active'
  },
  {
    id: '3',
    name: '12 cans of Tiger Beer',
    quantity: 1,
    expiryDate: 'Sun, 16 Sep 2024',
    location: 'Empire KTV',
    image: '/placeholder.svg?height=80&width=80&text=Tiger+Beer',
    status: 'expiring'
  },
  {
    id: '4',
    name: '12 cans of Tiger Beer',
    quantity: 1,
    expiryDate: 'Sun, 16 Sep 2024',
    location: 'Empire KTV',
    image: '/placeholder.svg?height=80&width=80&text=Tiger+Beer',
    status: 'expired'
  }
]

export default function AlcoholBalancePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="px-4 py-4 space-x-2 text-sm">
        <Link href="/" className="text-zinc-400 hover:text-white">
          Home
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-400">My Alcohol Balance</span>
      </div>

      {/* Header */}
      <div className="px-4 flex items-center justify-between mb-6">
        <h1 className="text-2xl font-furuta font-bold">My Alcohol Balance</h1>
        <Link href="/my-alcohol-balance/add">
          <Button size="sm"
            className="text-pink-600 underline bg-transparent border-none hover:no-underline"
          >
            <Plus className="w-4 h-4 mr-2" />
            ADD NEW
          </Button>
        </Link>
      </div>

      {/* Filter */}
      <div className="px-4 mb-6">
        <div className="flex justify-end items-center gap-2">
          <span className="text-sm font-furuta">Showing</span>
          <Select defaultValue="upcoming">
            <SelectTrigger className="w-[160px] bg-zinc-900/90 border-zinc-800 font-furuta">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      {/* Alcohol Items List */}
      <div className="px-4 space-y-4">
        {alcoholItems.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-base font-medium">{item.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-zinc-400">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Expiry: {item.expiryDate}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-zinc-400 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>Location: {item.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-lg font-medium">x{item.quantity}</span>
              {item.status === 'expiring' && (
                <span className="text-xs text-amber-500">
                  Expired in 3 days
                </span>
              )}
              {item.status === 'expired' && (
                <span className="text-xs text-red-500">
                  Expired
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

