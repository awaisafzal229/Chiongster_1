'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
    onSelectSection: (section: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectSection }) => {
    const pathname = usePathname()

    const links = [
        { name: 'Banner Images', href: '/admin/banner-images' },
        { name: 'Activity Section', href: '/admin/activity-section' },
        { name: 'Venue Category', href: '/admin/venue-category' }
    ]

    return (
        <div className="w-64 min-h-screen bg-black text-white p-4">
            <h2 className="text-xl font-bold text-pink-500 mb-6">Admin Panel</h2>
            <ul>
                {links.map(link => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={`block px-4 py-2 rounded-md 
                ${pathname === link.href ? 'bg-pink-500 text-white' : 'hover:bg-zinc-800 hover:text-pink-500'}`}
                            onClick={() => onSelectSection(link.name)}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
