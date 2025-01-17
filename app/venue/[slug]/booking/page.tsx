'use client'

import { useState } from 'react'
import { BookingDetails } from '@/components/booking/booking-details'
import { RedeemItems } from '@/components/booking/redeem-items'
import { BookingConfirmationView } from '@/components/booking/booking-confirmation'
import type { BookingFormData } from '@/types/booking'

type BookingStep = 'details' | 'redeem' | 'confirmation'

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('details')
  const [bookingData, setBookingData] = useState<BookingFormData>()
  const [bookingId, setBookingId] = useState<string>()

  const handleBookingSubmit = (data: BookingFormData) => {
    setBookingData(data)
    setCurrentStep('redeem')
  }

  const handleRedeemComplete = (id: string) => {
    setBookingId(id)
    setCurrentStep('confirmation')
  }

  const handleSkipRedeem = () => {
    // Generate booking ID without redemption
    const id = `#AAA${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`
    setBookingId(id)
    setCurrentStep('confirmation')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Progress Indicator */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-800">
          <div 
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ 
              width: currentStep === 'details' ? '33%' : 
                     currentStep === 'redeem' ? '66%' : '100%' 
            }}
          />
        </div>
        <div className="container px-4 py-4 flex justify-between text-sm">
          <span className={currentStep === 'details' ? 'text-amber-500' : 'text-zinc-400'}>
            Booking Details
          </span>
          <span className={currentStep === 'redeem' ? 'text-amber-500' : 'text-zinc-400'}>
            Redeem Item
          </span>
          <span className={currentStep === 'confirmation' ? 'text-amber-500' : 'text-zinc-400'}>
            Confirmation
          </span>
        </div>
      </div>

      {/* Step Content */}
      <div className="container px-4 py-6">
        {currentStep === 'details' && (
          <BookingDetails onSubmit={handleBookingSubmit} />
        )}
        {currentStep === 'redeem' && (
          <RedeemItems 
            onComplete={handleRedeemComplete}
            onSkip={handleSkipRedeem}
          />
        )}
        {currentStep === 'confirmation' && bookingId && bookingData && (
          <BookingConfirmationView 
            bookingId={bookingId}
            bookingData={bookingData}
          />
        )}
      </div>
    </div>
  )
}

