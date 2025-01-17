'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ProfileFormData {
  username: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  countryCode: string
}

export default function EditProfilePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ProfileFormData>({
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '91203123',
    countryCode: '+65'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    router.push('/profile')
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="px-4 py-4 space-x-2 text-sm">
        <Link href="/" className="text-zinc-400 hover:text-white">
          Home
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-400">Edit Profile</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 space-y-6">
        <h1 className="text-2xl font-bold">Edit Profile</h1>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Username</label>
          <Input
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            className="bg-zinc-900 border-zinc-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">First Name</label>
            <Input
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="bg-zinc-900 border-zinc-800"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">Last Name</label>
            <Input
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="bg-zinc-900 border-zinc-800"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="bg-zinc-900 border-zinc-800"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Phone Number</label>
          <div className="flex gap-2">
            <Select
              value={formData.countryCode}
              onValueChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
            >
              <SelectTrigger className="w-[100px] bg-zinc-900 border-zinc-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+65">+65</SelectItem>
                <SelectItem value="+60">+60</SelectItem>
                <SelectItem value="+62">+62</SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="flex-1 bg-zinc-900 border-zinc-800"
            />
          </div>
        </div>

        <button 
          type="button"
          className="text-[#FF2D92] text-sm font-medium"
          onClick={() => router.push('/profile/change-password')}
        >
          CHANGE PASSWORD
        </button>

        <Button 
          type="submit"
          className="fixed rounded-lg bottom-10 left-5 right-5 h-16 bg-gradient-to-r from-[#6D1DDB] to-[#B31DC6] hover:from-[#6D1DDB]/90 hover:to-[#B31DC6]/90"
        >
          SAVE CHANGES
        </Button>
      </form>
    </div>
  )
}

