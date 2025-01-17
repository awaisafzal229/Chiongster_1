'use client'

import Link from 'next/link'
import { Copy, Share2, ChevronDown, Diamond, Gift } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Footer } from '@/components/footer'

interface Referral {
  name: string
  date: string
  status: 'active' | 'inactive'
}

const referrals: Referral[] = [
  { name: "John Doe", date: "12 Jan 2024", status: 'active' },
  { name: "Jane Smith", date: "11 Jan 2024", status: 'active' },
  { name: "Mike Johnson", date: "10 Jan 2024", status: 'active' },
  { name: "Sarah Williams", date: "09 Jan 2024", status: 'active' }
]

const tiers = [
  { percentage: '10%', range: '1-4 referrals', min: 1, max: 4 },
  { percentage: '15%', range: '5-9 referrals', min: 5, max: 9 },
  { percentage: '20%', range: '>10 referrals', min: 10, max: Infinity }
]

export default function InsBenefitsPage() {
  const [inviteCode] = useState('RKAMDENANDEK')
  const activeReferrals = 4
  const totalRewards = 15

  const currentTier = tiers.find(
    tier => activeReferrals >= tier.min && activeReferrals <= tier.max
  )

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on ChioNightOut!',
        text: `Use my invite code: ${inviteCode}`,
        url: 'https://chionightout.com'
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Breadcrumb */}
      <div className="px-4 py-4 space-x-2 text-sm">
        <Link href="/" className="text-zinc-400 hover:text-white">
          Home
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-400">Insider Benefit</span>
      </div>

      {/* Stats Cards */}
      <div className="px-4 space-y-4">
        <div className="bg-[#1E1E1E] rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <Diamond className="w-8 h-8 text-[#FF1493]" />
          </div>
          <div>
            <div className="text-sm text-zinc-400">Active Referrals</div>
            <div className="text-3xl font-bold">{activeReferrals}</div>
          </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <Gift className="w-8 h-8 text-[#FF1493]" />
          </div>
          <div>
            <div className="text-sm text-zinc-400">Total Rewards</div>
            <div className="text-3xl font-bold flex items-center gap-1">
              {totalRewards}
              <span className="text-amber-500 text-lg">$</span>
            </div>
          </div>
        </div>

        <button className="text-[#FF1493] text-sm font-medium">
          HOW IT WORKS
        </button>
      </div>

      {/* Tiers Section */}
      <div className="px-4 mt-8">
        <div className="space-y-2 mb-4">
          <h2 className="text-xl font-bold">Your Tiers</h2>
          <p className="text-white text-sm">
            <span className="text-[#FFA500]">1 more sign up</span> to reach the next tier!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {tiers.map((tier, index) => (
            <div
              key={tier.percentage}
              className={`p-3 rounded-xl text-center relative ${
                index === 0
                  ? 'border-2 border-[#FF1493] bg-[#FF1493]/10'
                  : 'bg-[#1E1E1E]'
              }`}
            >
              <div className="text-lg font-bold">{tier.percentage}</div>
              <div className="text-xs text-zinc-400">{tier.range}</div>

              <div className="mt-2 flex justify-center">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-[#FF1493]' : 'bg-gray-500'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Invite Code Section */}
      <div className="px-4 mt-8 space-y-4">
        <h2 className="text-xl font-bold">Your Invite Code</h2>
        <div className="bg-[#1E1E1E] rounded-xl p-4 flex items-center justify-between">
          <div className="font-mono text-lg">{inviteCode}</div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-zinc-800"
              onClick={handleCopyCode}
            >
              <Copy className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-zinc-800"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Referrals Section */}
      <div className="px-4 mt-8">
        <Accordion
          type="single"
          collapsible
          className="w-full bg-[#1E1E1E] p-3 rounded-lg"
        >
          <AccordionItem value="referrals" className="border-b-0">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold">My Referrals</h2>
                <span className="text-sm text-zinc-400">({referrals.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 mt-4">
                {referrals.map((referral, index) => (
                  <div
                    key={index}
                    className="bg-[#1E1E1E] rounded-xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{referral.name}</div>
                      <div className="text-sm text-zinc-400">{referral.date}</div>
                    </div>
                    <div
                      className={`text-sm ${
                        referral.status === 'active'
                          ? 'text-emerald-500'
                          : 'text-zinc-400'
                      }`}
                    >
                      {referral.status === 'active' ? 'Active' : 'Inactive'}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>


      <Footer />
    </div>

