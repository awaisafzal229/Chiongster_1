'use client'

import Link from 'next/link'
import { Pen } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="px-4 py-4 space-x-2 text-sm">
        <Link href="/" className="text-zinc-400 hover:text-white">
          Home
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-400">See Profile</span>
      </div>

      {/* Profile Content */}
      <div className="px-4 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">See Profile</h1>
          <button 
            onClick={() => router.push('/profile/edit')}
            className="p-2"
          >
            <Pen className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm text-zinc-400">Username</label>
            <p className="text-white">johndoe</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-zinc-400">First Name</label>
              <p className="text-white">John</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-zinc-400">Last Name</label>
              <p className="text-white">Doe</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-zinc-400">Email Address</label>
            <p className="text-white">johndoe@gmail.com</p>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-zinc-400">Phone Number</label>
            <p className="text-white">(+65)91203123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

