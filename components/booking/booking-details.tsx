'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Minus, Plus, CalendarIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { BookingFormData } from '@/types/booking'

interface BookingDetailsProps {
  onSubmit: (data: BookingFormData) => void
}

export function BookingDetails({ onSubmit }: BookingDetailsProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    date: '',
    session: '',
    numberOfPeople: 1,
    roomSize: '',
    preferredManager: '',
    reservationName: '',
    notes: ''
  })
  const [date, setDate] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      date: date ? format(date, 'yyyy-MM-dd') : ''
    })
  }

  const adjustPeople = (increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      numberOfPeople: increment 
        ? Math.min(prev.numberOfPeople + 1, 10)
        : Math.max(prev.numberOfPeople - 1, 1)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Venue Header */}
      <div className="flex items-center gap-4">
        <Image
          src="/placeholder.svg?height=60&width=60&text=Venue"
          alt="Empire KTV"
          width={60}
          height={60}
          className="rounded-lg"
        />
        <div>
          <h1 className="font-bold text-lg">Empire KTV</h1>
          <p className="text-sm text-zinc-400">
            150 Orchard Rd, #05-20 Orchard Plaza,
            <br />
            Singapore 238841
          </p>
        </div>
      </div>

      {/* Date Selection */}
      <div className="space-y-2">
        <label className="text-sm">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-zinc-900 border-zinc-800",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Session Selection */}
      <div className="space-y-2">
        <label className="text-sm">Session</label>
        <Select
          value={formData.session}
          onValueChange={(value) => setFormData(prev => ({ ...prev, session: value }))}
        >
          <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
            <SelectValue placeholder="Select Session" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="afternoon">3:00 PM - 7:00 PM</SelectItem>
            <SelectItem value="evening">7:00 PM - 11:00 PM</SelectItem>
            <SelectItem value="night">11:00 PM - 3:00 AM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Number of People */}
      <div className="space-y-2">
        <label className="text-sm">Number of People</label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => adjustPeople(false)}
            className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-lg font-medium w-8 text-center">
            {formData.numberOfPeople}
          </span>
          <button
            type="button"
            onClick={() => adjustPeople(true)}
            className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Room Size */}
      <div className="space-y-2">
        <label className="text-sm">Room Size</label>
        <Select
          value={formData.roomSize}
          onValueChange={(value) => setFormData(prev => ({ ...prev, roomSize: value }))}
        >
          <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
            <SelectValue placeholder="Select Room" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small Room (1-3 pax)</SelectItem>
            <SelectItem value="medium">Medium Room (4-6 pax)</SelectItem>
            <SelectItem value="large">Large Room (7-10 pax)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Preferred Manager */}
      <div className="space-y-2">
        <label className="text-sm">Preferred Manager</label>
        <Select
          value={formData.preferredManager}
          onValueChange={(value) => setFormData(prev => ({ ...prev, preferredManager: value }))}
        >
          <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
            <SelectValue placeholder="Select Preferred Manager" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alice">Alice</SelectItem>
            <SelectItem value="bob">Bob</SelectItem>
            <SelectItem value="charlie">Charlie</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reservation Name */}
      <div className="space-y-2">
        <label className="text-sm">Reservation Name</label>
        <Input
          value={formData.reservationName}
          onChange={(e) => setFormData(prev => ({ ...prev, reservationName: e.target.value }))}
          className="bg-zinc-900 border-zinc-800"
          placeholder="Enter reservation name"
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="text-sm">Notes</label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          className="bg-zinc-900 border-zinc-800"
          placeholder="Add any special requests or notes"
          rows={3}
        />
      </div>

      <Button 
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        CONTINUE
      </Button>
    </form>
  )
}

