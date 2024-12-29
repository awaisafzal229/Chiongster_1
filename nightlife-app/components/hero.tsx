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
    <div className="relative h-[300px] mb-8 mt-8">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-10" />
        <img
          src="/placeholder.svg?height=300&width=600&text=Nightclub+Scene"
          alt="Nightclub scene"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-20 p-4 pt-8 space-y-6">
        <h1 className="text-2xl font-bold">Discover Drinking Spots Near You</h1>
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full bg-zinc-900/90 border-zinc-800">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
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
          className="w-full bg-purple-600 hover:bg-purple-700"
          onClick={handleShowNearby}
        >
          SHOW NEARBY
        </Button>
      </div>
    </div>
  )
}

