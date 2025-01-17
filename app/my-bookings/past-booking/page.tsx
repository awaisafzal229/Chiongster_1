'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CalendarIcon, ClockIcon, CheckCircle2 } from 'lucide-react'
import { Footer } from '@/components/footer'

interface PastBooking {
  id: string
  venueName: string
  date: string
  timing: string
  hasReceipt: boolean
  uploaded: boolean
}

const pastBookings: PastBooking[] = [
  {
    id: '1',
    venueName: 'Empire KTV',
    date: 'Sun, 12 Jan 2024',
    timing: 'Timing: 3:00pm-9:00pm',
    hasReceipt: false,
    uploaded: false
  },
  {
    id: '2',
    venueName: 'Marquee',
    date: 'Sun, 12 Jan 2024',
    timing: 'Timing: 3:00pm-9:00pm',
    hasReceipt: false,
    uploaded: true
  },
  {
    id: '3',
    venueName: 'Marquee',
    date: 'Sun, 12 Jan 2024',
    timing: 'Timing: 3:00pm-9:00pm',
    hasReceipt: true,
    uploaded: true
  },
  {
    id: '4',
    venueName: 'Marquee',
    date: 'Sun, 12 Jan 2024',
    timing: 'Timing: 3:00pm-9:00pm',
    hasReceipt: true,
    uploaded: true
  }
]

export default function PastBookingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Breadcrumb */}
      <div className="px-4 py-4 space-x-2 text-sm text-zinc-400">
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <span>/</span>
        <Link href="/my-bookings" className="hover:text-white">
          My Bookings
        </Link>
        <span>/</span>
        <span>Past Booking</span>
      </div>

      {/* Page Title */}
      <div className="px-4 pb-6">
        <h1 className="text-2xl font-bold">Past Bookings</h1>
        <p className="text-sm text-zinc-400">
          All bookings completed in the past 3 months
        </p>
      </div>

      {/* Bookings List */}
      <div className="px-4 space-y-6">
        {pastBookings.map((booking) => (
          <div
            key={booking.id}
            className="p-4 rounded-lg shadow-md border-b-6 border-zinc-700"
          >
            <h2 className="text-lg font-semibold mb-1">{booking.venueName}</h2>
            <div className="text-sm text-zinc-400 mb-2">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>{booking.date}</span>
              </div>
            </div>
            <div className="text-sm text-zinc-400 mb-4">
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4" />
                <span>{booking.timing}</span>
              </div>
            </div>

            {booking.hasReceipt ? (
              <div className="flex flex-col gap-2 text-sm text-emerald-500 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Receipt uploaded</span>
                </div>
                <button 
                  className="w-full py-2 px-4 text-white border border-white rounded-lg hover:bg-zinc-800">
                  BOOK AGAIN
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 w-full">
                <button 
                  className={`flex-1 py-2 px-4 rounded-lg hover:opacity-90 ${booking.uploaded ? 'bg-zinc-700 text-zinc-500' : 'text-white bg-gradient-to-r from-pink-500 to-purple-500'}`}>
                  UPLOAD RECEIPT
                </button>
                <button 
                  className="flex-1 py-2 px-4 border border-white rounded-lg hover:bg-zinc-800">
                  BOOK AGAIN
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}

