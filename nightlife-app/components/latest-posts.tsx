'use client'

import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BlogCard } from './blog-card'

const posts = [
  {
    date: '6 Aug 2024',
    title: 'Warm Places',
    tags: ['Journey', 'Travel'],
    description: 'Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum consequuntur et, eam ut veri omnium fabulas. Lorem ip...',
    image: '/placeholder.svg?height=200&width=400&text=Warm+Places'
  },
  {
    date: '6 Aug 2024',
    title: 'Best Nightlife',
    tags: ['Journey', 'Nightlife'],
    description: 'Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum consequuntur et, eam ut veri omnium fabulas. Lorem ip...',
    image: '/placeholder.svg?height=200&width=400&text=Best+Nightlife'
  },
  {
    date: '1 Aug 2024',
    title: 'Best Nightlife 3',
    tags: ['Journey', 'Nightlife 3'],
    description: 'Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum consequuntur et, eam ut veri omnium fabulas. Lorem ip...',
    image: '/placeholder.svg?height=200&width=400&text=Best+Nightlife'
  },
]

export function LatestPosts() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (container) {
      const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      setScrollPosition(container.scrollLeft + scrollAmount)
    }
  }

  return (
    <section className="space-y-6 relative">
      <div className="space-y-1">
        <p className="text-amber-500 text-sm">Be updated</p>
        <h2 className="text-2xl font-bold">LATEST POSTS</h2>
      </div>
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide snap-x snap-mandatory"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory'
        }}
      >
        {posts.map((post) => (
          <div key={post.title} className="flex-none w-[300px] md:w-[400px] snap-start">
            <BlogCard {...post} />
          </div>
        ))}
      </div>
      <>
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
          style={{ display: scrollPosition < (scrollRef.current?.scrollWidth ?? 0) - (scrollRef.current?.clientWidth ?? 0) ? 'block' : 'none' }}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </>
    </section>
  )
}

