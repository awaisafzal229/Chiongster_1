'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('https://chat.innov8sion.com/api/venue-categories/names/')
      .then(response => response.json())
      .then(data => {
        setCategories(data.map(category => ({
          name: category.name,
          slug: category.name.toLowerCase().replace(/\s+/g, '-')
        })))
      })
      .catch(error => console.error('Error fetching categories:', error))
  }, [])

  const handleCategoryChange = (value: string) => {
    if (value !== 'all') {
      router.push(`/category/${value}`)
    }
  }

  const handleShowNearby = () => {
    router.push('/category/all')
  }

  return (
    <div className="mt-10 p-6 space-y-3">
      <h1 className="text-base font-thin text-white font-futura">
        Discover Drinking Spots Near You
      </h1>

      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full bg-transparent border border-pink-500 text-white">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent className="bg-black border-pink-500 text-white">
          <SelectItem className="text-pink-400 font-thin data-[highlighted]:text-pink-500 data-[highlighted]:bg-zinc-800" value="all">
            All Categories
          </SelectItem>
          {categories.map(category => (
            <SelectItem
              key={category.slug}
              value={category.slug}
              className="text-white data-[highlighted]:text-pink-500 data-[highlighted]:bg-zinc-800"
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>

      </Select>
      <Button
        className="w-full bg-gradient-to-r text-xl from-[#8E2DE2] to-[#F000FF] hover:from-[#7B27C1] hover:to-[#C000E0] text-white font-futura mt-4"
        onClick={handleShowNearby}
      >
        Show Nearby
      </Button>
    </div>
  )
}
