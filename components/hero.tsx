'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function Hero() {
  const router = useRouter()
  
  const handleCategoryChange = (value: string) => {
    if (value !== 'all') {
      router.push(`/category/${value.toLowerCase().replace(/ /g, '-')}`)
    }
  }

  const handleShowNearby = () => {
    router.push('/category/all')
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-1.5xl font-bold text-white font-futura mb-4">Discover Drinking Spots Near You</h1>
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full bg-zinc-700 text-white">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-500 border-zinc-500 text-black">
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="boys-club">Boys Club</SelectItem>
          <SelectItem value="club">Club</SelectItem>
          <SelectItem value="family-ktv">Family KTV</SelectItem>
          <SelectItem value="family-joint">Family Joint</SelectItem>
          <SelectItem value="ktv-nightclub">KTV Nightclub</SelectItem>
          <SelectItem value="popular">Popular</SelectItem>
          <SelectItem value="pub">Pub</SelectItem>
          <SelectItem value="thai-disco">Thai Disco</SelectItem>
        </SelectContent>
      </Select>
      <Button
        className="w-full bg-gradient-to-r from-[#8E2DE2] to-[#F000FF] hover:from-[#7B27C1] hover:to-[#C000E0] text-white font-futura mt-4"
        onClick={handleShowNearby}
      >
        Show Nearby
      </Button>
    </div>
  )
}
7

