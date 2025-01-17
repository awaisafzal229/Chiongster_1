'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import type { BookingFormData } from '@/types/booking'
import QRCode from 'qrcode'

interface BookingConfirmationViewProps {
  bookingId: string
  bookingData: BookingFormData
}

export function BookingConfirmationView({ 
  bookingId, 
  bookingData 
}: BookingConfirmationViewProps) {
  const [qrCode, setQrCode] = useState<string>()

  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(bookingId)
        setQrCode(url)
      } catch (err) {
        console.error('Failed to generate QR code:', err)
      }
    }
    generateQR()
  }, [bookingId])

  return (
    <div className="space-y-6">
      {/* Booking Header */}
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          Empire KTV
          <span className="text-amber-500">{bookingId}</span>
        </h2>
        <p className="text-sm text-zinc-400">
          150 Orchard Rd, #05-20 Orchard Plaza,
          <br />
          Singapore 238841
        </p>
      </div>

      {/* Date and Time */}
      <div className="flex gap-4 text-sm">
        <div className="flex-1">
          <p className="text-zinc-400">Date</p>
          <p>{new Date(bookingData.date).toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}</p>
        </div>
        <div className="flex-1">
          <p className="text-zinc-400">Time</p>
          <p>{bookingData.session}</p>
        </div>
      </div>

      {/* Check-in Details */}
      <div className="bg-zinc-900 rounded-lg p-4 space-y-4">
        <h3 className="font-medium">Check in Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">No of Pax</span>
            <span>: {bookingData.numberOfPeople}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Room No</span>
            <span>: [Room Number]</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Manager</span>
            <span>: {bookingData.preferredManager}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Notes</span>
            <span>: {bookingData.notes || 'None'}</span>
          </div>
        </div>

        {qrCode && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-zinc-400">
              Upon arrival, please get this QR Code scanned
            </p>
            <Image
              src={qrCode}
              alt="Check-in QR Code"
              width={200}
              height={200}
              className="bg-white p-2 rounded-lg"
            />
          </div>
        )}

        <Button
          variant="outline"
          className="w-full border-pink-600 text-pink-600 hover:bg-pink-600/10"
        >
          CANCEL BOOKING
        </Button>
      </div>

      {/* Redeemed Items */}
      <div className="space-y-4">
        <h3 className="font-medium">Redeemed Items</h3>
        <div className="bg-zinc-900 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{bookingId}</p>
              <p className="text-sm text-zinc-400">3 items • 12 January 2024</p>
            </div>
            <div className="flex items-center gap-1">
              <span>275</span>
              <Image
                src="/placeholder.svg?height=16&width=16&text=$"
                alt="coins"
                width={16}
                height={16}
                className="rounded-full"
              />
            </div>
          </div>
          <button className="w-full text-left text-sm text-purple-400 mt-2">
            SHOW REDEMPTION CODE
          </button>
        </div>
        <Button className="w-full bg-purple-600 hover:bg-purple-700">
          REDEEM MORE ITEMS
        </Button>
      </div>
    </div>
  )
}

