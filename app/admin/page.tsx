'use client'

import { useState } from 'react'
import Sidebar from './sidebar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export default function AdminPage() {
    const [selectedSection, setSelectedSection] = useState('')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true) // Toggle sidebar

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Mobile Toggle Button */}
            <Button
                className="md:hidden p-3 bg-zinc-800 text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <Menu className="w-6 h-6" />
            </Button>

            {/* Sidebar (Hidden on Mobile unless toggled) */}
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-64 bg-zinc-900 p-4`}>
                <Sidebar onSelectSection={setSelectedSection} />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 text-white bg-zinc-900">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="text-zinc-400">Selected Section: {selectedSection}</p>
            </div>
        </div>
    )
}
