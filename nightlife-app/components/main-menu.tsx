'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon, ChevronRight, X } from 'lucide-react'
import { Home, GlassWater, MapPin, Calendar, Heart, Coins, Star, Wine, LogOut, User } from 'lucide-react'

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  hasDropdown?: boolean
  subItems?: Array<{
    label: string
    slug?: string
  }>
}

const menuItems: MenuItem[] = [
  { icon: Home, label: 'Home Page' },
  { 
    icon: GlassWater, 
    label: 'Choose Your Vibes', 
    hasDropdown: true,
    subItems: [
      { label: 'Happy Hour', slug: 'happy-hour' },
      { label: 'Activities', slug: 'activities' },
      { label: 'Exclusive For Men', slug: 'exclusive-for-men' },
      { label: 'Ladies Night', slug: 'ladies-night' },
      { label: 'Classy Chill', slug: 'classy-chill' }
    ]
  },
  { 
    icon: MapPin, 
    label: 'Pick Your Place', 
    hasDropdown: true,
    subItems: [
      { label: 'Pub', slug: 'pub' },
      { label: 'Lounge & Bar', slug: 'lounge-and-bar' },
      { label: 'KTV Nightclub', slug: 'ktv-nightclub' },
      { label: 'Boys Club', slug: 'boys-club' },
      { label: 'Flower Joint', slug: 'flower-joint' },
      { label: 'Thai Disco', slug: 'thai-disco' },
      { label: 'Family KTV', slug: 'family-ktv' }
    ]
  },
  { 
    icon: Calendar, 
    label: 'My Bookings', 
    hasDropdown: true,
    subItems: [
      { label: 'Current Bookings' },
      { label: 'Past Bookings' }
    ]
  },
  { icon: Heart, label: 'My Favourites' },
  { icon: Coins, label: 'My Drink Dollars' },
  { icon: Star, label: 'Insider Benefits' },
  { icon: Wine, label: 'My Alcohol Balance' },
]

export function MainMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleSubmenu = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.hasDropdown) {
      toggleSubmenu(item.label)
    } else {
      if (item.label === 'Home Page') {
        router.push('/')
        setOpen(false)
      }
    }
  }

  const handleSubItemClick = (subItem: { label: string, slug?: string }) => {
    if (subItem.slug) {
      router.push(`/category/${subItem.slug}`)
      setOpen(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-1">
          <MenuIcon className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-full sm:w-[400px] p-0 bg-zinc-950 border-zinc-800"
      >
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="relative h-[120px] bg-gradient-to-r from-amber-500 to-amber-700 p-4">
            <button 
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-12 h-12 rounded-full bg-zinc-300 flex items-center justify-center">
                <User className="w-6 h-6 text-zinc-600" />
              </div>
              <div>
                <h2 className="font-semibold text-white">Name Here</h2>
                <button className="text-sm text-white/80 flex items-center gap-1">
                  SEE PROFILE
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="absolute top-4 right-12">
              <span className="px-2 py-1 rounded-full bg-white text-xs font-medium">
                GOLD
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-2">
            {menuItems.map((item) => (
              <div key={item.label}>
                <button
                  className="flex items-center justify-between w-full p-4 hover:bg-zinc-900 text-white"
                  onClick={() => handleMenuItemClick(item)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.hasDropdown && (
                    <ChevronRight className={`w-5 h-5 text-zinc-500 transition-transform ${expandedItems.includes(item.label) ? 'rotate-90' : ''}`} />
                  )}
                </button>
                {item.hasDropdown && expandedItems.includes(item.label) && (
                  <div className="ml-8 py-2">
                    {item.subItems?.map((subItem) => (
                      <button
                        key={subItem.label}
                        className="flex items-center w-full p-2 hover:bg-zinc-900 text-white"
                        onClick={() => handleSubItemClick(subItem)}
                      >
                        <span>{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Log Out */}
          <div className="border-t border-zinc-800">
            <button className="flex items-center gap-3 w-full p-4 hover:bg-zinc-900 text-white">
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

