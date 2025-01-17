'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon, ChevronRight, X } from 'lucide-react'
import { Menu, Search, Ticket, Heart, Coins, Diamond, Wine, LogOut, User, HandHeart } from 'lucide-react'

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  hasDropdown?: boolean
  subItems?: Array<{
    label: string
    slug?: string
  }>
  slug?: string
  highlight?: boolean
}

const menuItems: MenuItem[] = [
  { icon: Menu, label: 'Home Page', highlight: true },
  { 
    icon: HandHeart, 
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
    icon: Search, 
    label: 'Pick Your Place', 
    hasDropdown: true,
    subItems: [
      { label: 'Pub', slug: 'pub' },
      { label: 'Lounge & Bar', slug: 'category/lounge-and-bar' },
      { label: 'KTV Nightclub', slug: 'category/ktv-nightclub' },
      { label: 'Boys Club', slug: 'category/boys-club' },
      { label: 'Flower Joint', slug: 'category/flower-joint' },
      { label: 'Thai Disco', slug: 'category/thai-disco' },
      { label: 'Family KTV', slug: 'category/family-ktv' }
    ]
  },
  { 
    icon: Ticket, 
    label: 'My Bookings', 
    hasDropdown: true,
    subItems: [
      { label: 'Current Bookings' },
      { label: 'Past Bookings', slug: 'my-bookings/past-booking' }
    ]
  },
  { icon: Heart, label: 'My Favourites' },
  { icon: Coins, label: 'My Drink Dollars', slug: 'my-drink-dollars' },
  { icon: Diamond, label: 'Insider Benefits', slug: 'ins-benefits' },
  { icon: Wine, label: 'My Alcohol Balance', slug: 'my-alcohol-balance' },
]

export function MainMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState('Home Page')

  const toggleSubmenu = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const handleMenuItemClick = (item: MenuItem) => {
    setSelectedItem(item.label)
    if (item.hasDropdown) {
      toggleSubmenu(item.label)
    } else {
      if (item.label === 'Home Page') {
        router.push('/')
        setOpen(false)
      } else if (item.slug) {
        router.push(`/${item.slug}`)
        setOpen(false)
      }
    }
  }

  const handleSubItemClick = (subItem: { label: string, slug?: string }) => {
    if (subItem.slug) {
      router.push(`/${subItem.slug}`)
      setOpen(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('session')
    router.push('/login')
    router.refresh()
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
        className="w-full sm:w-[400px] p-0 bg-[#121212] border-zinc-800"
      >
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="relative h-[120px] bg-[#1E1E1E] p-4">
            <button 
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-white"
            >
            </button>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
                <User className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h2 className="font-semibold text-white text-lg font-futura">Name Here</h2>
                <Link href="/profile">
                  <button className="text-sm text-white/90 flex items-center gap-1 font-futura">
                    SEE PROFILE
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-2 p-4">
            {menuItems.map((item) => (
              <div key={item.label}>
                <button
                  className={`flex items-center justify-between w-full px-6 py-4 hover:bg-zinc-900/50 transition-colors ${
                    item.highlight ? 'p-8 text-[#FF1493] bg-[#FF1493]/5' : 'text-white'
                  }`}
                  onClick={() => handleMenuItemClick(item)}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={`w-6 h-6 ${
                      item.highlight ? 'text-[#FF1493]' : 'text-white'
                    }`} />
                    <span className="font-futura text-[15px]">{item.label}</span>
                  </div>
                  {item.hasDropdown && (
                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      expandedItems.includes(item.label) ? 'rotate-90' : ''
                    } text-zinc-500`} />
                  )}
                </button>
                {item.hasDropdown && expandedItems.includes(item.label) && (
                  <div className="ml-14 py-1">
                    {item.subItems?.map((subItem) => (
                      <button
                        key={subItem.label}
                        className="flex items-center w-full px-6 py-3 text-white hover:bg-zinc-900/50 font-futura text-[15px]"
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

          {/* Subscribe Banner */}
          <div className="px-4 py-3">
            <Link href="/subscribe">
              <div className="rounded-lg p-4 bg-gradient-to-br from-[#1E1E1E] to-[#121212] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Diamond className="w-10 h-10 text-[#FF1493]" />
                  <div>
                    <div className="font-medium text-white text-base">Subscribe to Pro Chiongster</div>
                    <div className="text-sm text-white/60">Earn more benefits</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40" />
              </div>
            </Link>
          </div>

          {/* Log Out */}
          <div className="border-t border-zinc-800">
            <button 
              className="flex items-center gap-4 w-full px-6 py-4 hover:bg-zinc-900/50 text-white"
              onClick={handleLogout}
            >
              <LogOut className="w-6 h-6" />
              <span className="font-futura text-[15px]">Log Out</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

