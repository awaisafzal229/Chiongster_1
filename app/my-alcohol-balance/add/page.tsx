'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon, Minus, Plus, Upload } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export default function AddNewBalancePage() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [quantity, setQuantity] = useState(1)
  const [reminder, setReminder] = useState(1)

  const adjustQuantity = (increment: boolean) => {
    setQuantity(prev => increment ? prev + 1 : Math.max(1, prev - 1))
  }

  const adjustReminder = (increment: boolean) => {
    setReminder(prev => increment ? prev + 1 : Math.max(1, prev - 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    router.push('/my-alcohol-balance')
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="px-4 py-4 space-x-2 text-sm">
        <Link href="/" className="text-zinc-400 hover:text-white">
          Home
        </Link>
        <span className="text-zinc-600">/</span>
        <Link href="/my-alcohol-balance" className="text-zinc-400 hover:text-white">
          My Alcohol Balance
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-400">Add New Balance</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 space-y-6">
        <h1 className="text-2xl font-furuta font-bold">Add New Balance</h1>

        {/* Alcohol Name */}
        <div className="space-y-2">
          <label className="text-sm">Alcohol Name</label>
          <Input
            placeholder="Ex: 1 Tower Tiger Beer"
            className="bg-zinc-900 border-zinc-800"
          />
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label className="text-sm">Quantity</label>
          <div className="flex items-center w-1/2 border border-zinc-800 rounded-lg bg-zinc-900">
            <button
              type="button"
              onClick={() => adjustQuantity(false)}
              className="w-10 p-2 text-center hover:bg-zinc-800"
            >
              <Minus className="w-4 h-4 mx-auto" />
            </button>
            <span className="flex-1 text-lg font-medium text-center border-x border-zinc-800">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => adjustQuantity(true)}
              className="w-10 p-2 text-center hover:bg-zinc-800"
            >
              <Plus className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>

        {/* Venue Name */}
        <div className="space-y-2">
          <label className="text-sm">Venue Name</label>
          <Select>
            <SelectTrigger className="w-full bg-zinc-900 border-zinc-800">
              <SelectValue placeholder="Select Venue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="empire">Empire KTV</SelectItem>
              <SelectItem value="marquee">Marquee</SelectItem>
              <SelectItem value="neon">Neon Lounge</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Expiry Date */}
        <div className="space-y-2">
          <label className="text-sm">Expiry Date</label>
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
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Reminder */}
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Reminder</label>
          <div className="flex items-center w-fit border border-zinc-800 rounded-lg bg-zinc-900 px-2">
            <button
              type="button"
              onClick={() => adjustReminder(false)}
              className="w-8 h-8 flex justify-center items-center hover:bg-zinc-800 rounded"
            >
              <Minus className="w-4 h-4 text-zinc-400" />
            </button>
            <span className="text-lg font-medium text-center text-white mx-3">
              {reminder}
            </span>
            <button
              type="button"
              onClick={() => adjustReminder(true)}
              className="w-8 h-8 flex justify-center items-center hover:bg-zinc-800 rounded"
            >
              <Plus className="w-4 h-4 text-zinc-400" />
            </button>
            <span className="text-sm text-zinc-400 ml-2">day(s) before</span>
          </div>
        </div>

        {/* Upload Photo */}
        <div className="space-y-2">
          <label className="text-sm">Upload photo</label>
          <div className="border-2 border-dashed border-zinc-800 rounded-lg p-8">
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-zinc-400" />
              <p className="text-sm text-zinc-400">
                <button type="button" className="text-pink-500">Click here</button> to upload your image or drag and drop
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit"
          className="p-4 w-auto bg-gradient-to-r from-[#8E2DE2] to-[#F000FF] fixed bottom-6 left-4 right-4 mx-auto"
        >
          ADD BALANCE
        </Button>
      </form>
    </div>
  )
}

