'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon, ChevronRight, X } from 'lucide-react'
import { Menu, Search, Ticket, Heart, Coins, Diamond, Wine, LogOut, User, HandHeart } from 'lucide-react'
import Cookies from 'js-cookie'
import { clearAuth } from '@/lib/auth'
import Image from 'next/image'

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  hasDropdown?: boolean
  subItems?: Array<{ label: string; slug?: string; categoryId?: number }>
  slug?: string
  highlight?: boolean
}

export function MainMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState('Home Page')
  const [venueCategories, setVenueCategories] = useState<{ id: number; name: string }[]>([])

  // Fetch Venue Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://chat.innov8sion.com/api/venue-categories/names/')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setVenueCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  // Dynamic Menu Items
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
      subItems: venueCategories.map(category => ({
        label: category.name,
        slug: `category/${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        categoryId: category.id
      }))
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
    { icon: Heart, label: 'My Favourites', slug: 'my-favourites' },
    { icon: Coins, label: 'My Drink Dollars', slug: 'my-drink-dollars' },
    { icon: Diamond, label: 'Insider Benefits', slug: 'ins-benefits' },
    { icon: Wine, label: 'My Alcohol Balance', slug: 'my-alcohol-balance' },
  ]

  const toggleSubmenu = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
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
    // Clear all auth data using our auth utility
    clearAuth();

    // Remove any additional cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    // Reload the page and redirect to login
    window.location.href = '/login';
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative">
          {/* ✅ Fixed Navigation Bar */}
          <div className="fixed top-0 left-0 w-full z-50 bg-black p-2 shadow-md">
            <button className="flex items-center gap-x-3 p-2 bg-black">
              <MenuIcon className="w-6 h-6 text-white" />
              <Link href="/">
                <Image
                  src="/logo.jpg"
                  alt="ChioNightOut"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
              </Link>
            </button>
          </div>

          {/* ✅ Push Content Below Navbar (inside the same parent div) */}
          <main className="pt-16">
            {/* <h1 className="text-white">Your Content Starts Here</h1>
            <p className="text-gray-300">This will now be visible below the fixed navbar.</p> */}
          </main>
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full sm:w-[400px] p-0 bg-[#121212] border-zinc-800"
      >
        <div className="flex flex-col h-full overflow-y-auto pt-10">

          {/* Profile Section */}
          <div className="relative min-h-[80px] bg-[#2a2929] p-4">
            <div className="flex items-center gap-3 mt-4">
              <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
                <User className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h2 className="font-semibold text-white text-lg font-futura">Name Here</h2>
                <Link href="/profile">
                  <button className="underline text-sm text-white/90 flex items-center gap-1 font-futura">
                    SEE PROFILE
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-2 pl-3 pr-3 mt-2">
            {menuItems.map((item) => (
              <div key={item.label}>
                <button
                  className={`flex items-center justify-between w-full rounded-sm px-6 py-4 hover:bg-zinc-900/50 transition-colors ${item.highlight ? 'p-8 text-[#FF1493] bg-[#2f2529]' : 'text-white'}`}
                  onClick={() => handleMenuItemClick(item)}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={`w-6 h-6 ${item.highlight ? 'text-[#FF1493]' : 'text-white'}`} />
                    <span className="font-futura text-[15px]">{item.label}</span>
                  </div>
                  {item.hasDropdown && (
                    <ChevronRight className={`w-5 h-5 transition-transform ${expandedItems.includes(item.label) ? 'rotate-90' : ''} text-zinc-500`} />
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