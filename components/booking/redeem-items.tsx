'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'
import type { RedeemableItem } from '@/types/booking'

interface RedeemItemsProps {
  onComplete: (bookingId: string) => void
  onSkip: () => void
}

const redeemableItems: RedeemableItem[] = [
  {
    id: '1',
    name: 'Tiger Beer',
    description: 'Can of Beer',
    price: 2.5,
    image: '/placeholder.svg?height=80&width=80&text=Tiger+Beer'
  },
  // Add more items as needed
]

export function RedeemItems({ onComplete, onSkip }: RedeemItemsProps) {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({})
  const [balance] = useState(32.45) // This would come from user's account

  const totalAmount = Object.entries(selectedItems).reduce((sum, [id, quantity]) => {
    const item = redeemableItems.find(item => item.id === id)
    return sum + (item?.price ?? 0) * quantity
  }, 0)

  const handleAddItem = (itemId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))
  }

  const handleRemoveItem = (itemId: string) => {
    setSelectedItems(prev => {
      const newCount = (prev[itemId] || 0) - 1
      const newItems = { ...prev }
      if (newCount <= 0) {
        delete newItems[itemId]
      } else {
        newItems[itemId] = newCount
      }
      return newItems
    })
  }

  const handleSubmit = () => {
    // Generate a booking ID
    const bookingId = `#AAA${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`
    onComplete(bookingId)
  }

  return (
    <div className="space-y-6">
      {/* Balance Header */}
      <div className="bg-purple-900/50 p-4 rounded-lg flex justify-between items-center">
        <span>Your Drink $$</span>
        <span className="flex items-center gap-1">
          {balance.toFixed(2)}
          <Image
            src="/placeholder.svg?height=16&width=16&text=$"
            alt="coins"
            width={16}
            height={16}
            className="rounded-full"
          />
        </span>
      </div>

      {/* Redeemable Items */}
      <div className="space-y-4">
        {redeemableItems.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                {item.price}
                <Image
                  src="/placeholder.svg?height=16&width=16&text=$"
                  alt="coins"
                  width={16}
                  height={16}
                  className="rounded-full"
                />
              </span>
              {selectedItems[item.id] ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center">{selectedItems[item.id]}</span>
                  <button
                    onClick={() => handleAddItem(item.id)}
                    className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddItem(item.id)}
                  className="p-2 rounded-full bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Total and Actions */}
      <div className="space-y-4">
        {Object.keys(selectedItems).length > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span>Total:</span>
            <span className="flex items-center gap-1">
              {totalAmount.toFixed(2)}
              <Image
                src="/placeholder.svg?height=16&width=16&text=$"
                alt="coins"
                width={16}
                height={16}
                className="rounded-full"
              />
              ({Object.keys(selectedItems).length} items)
            </span>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {Object.keys(selectedItems).length > 0 ? 'REDEEM & BOOK' : 'CONTINUE WITHOUT REDEEMING'}
          </Button>
          {Object.keys(selectedItems).length === 0 && (
            <Button
              onClick={onSkip}
              variant="outline"
              className="w-full border-zinc-800 hover:bg-zinc-900"
            >
              SKIP
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

