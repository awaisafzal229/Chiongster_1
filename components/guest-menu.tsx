'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MenuIcon, ChevronRight, X, Diamond } from 'lucide-react'

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
  { 
    icon: () => <span className="text-pink-500">☰</span>, 
    label: 'Home Page', 
    highlight: true 
  },
  { 
    icon: () => <span>👋</span>, 
    label: 'Choose Your Vibes', 
    hasDropdown: true,
    subItems: [
      { label: 'Happy Hour' },
      { label: 'Activities' },
      { label: 'Exclusive For Men' },
      { label: 'Ladies Night' },
      { label: 'Classy Chill' }
    ]
  },
  { 
    icon: () => <span>🔍</span>, 
    label: 'Pick Your Place', 
    hasDropdown: true,
    subItems: [
      { label: 'Pub' },
      { label: 'Lounge & Bar' },
      { label: 'KTV Nightclub' },
      { label: 'Boys Club' },
      { label: 'Flower Joint' },
      { label: 'Thai Disco' },
      { label: 'Family KTV' }
    ]
  },
  { icon: () => <span>💰</span>, label: 'My Drink Dollars' },
  { icon: () => <span>💎</span>, label: 'Insider Benefits' },
  { icon: () => <span>🍷</span>, label: 'My Alcohol Balance' },
]

export function GuestMenu() {
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
      router.push('/login')
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
        className="w-full sm:w-[400px] p-0 bg-[#121212] border-zinc-800"
      >
        <div className="flex flex-col h-full">
          {/* Auth Buttons */}
          <div className="p-4 flex gap-4">
            <Link href="/register" className="flex-1">
              <Button 
                className="w-full bg-[#8E2DE2] hover:bg-[#7B27C1] text-white"
              >
                SIGN UP
              </Button>
            </Link>
            <Link href="/login" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-white text-white bg-zinc-800"
              >
                LOG IN
              </Button>
            </Link>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-2">
            {menuItems.map((item) => (
              <div key={item.label}>
                <button
                  className={`flex items-center justify-between w-full px-6 py-4 hover:bg-zinc-900/50 transition-colors ${
                    item.highlight ? 'text-[#FF1493]' : 'text-white'
                  }`}
                  onClick={() => handleMenuItemClick(item)}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="w-6 h-6" />
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
                        onClick={() => router.push('/login')}
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
        </div>
      </SheetContent>
    </Sheet>
  )
}

