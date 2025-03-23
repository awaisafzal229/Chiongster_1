'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { GuestMenu } from '@/components/guest-menu';
import { MainMenu } from '@/components/main-menu';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Menu Button (Three Lines) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md hover:bg-zinc-900 transition duration-300"
        >
          <MenuIcon className="w-6 h-6 text-white" />
        </button>

        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.jpg"
            alt="ChioNightOut"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
        </Link>

        {/* Empty space to balance alignment */}
        <div className="w-6" />
      </div>

      {/* Conditional Rendering of Menu (Main or Guest) */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full">
          {/* Show MainMenu if user is logged in, otherwise show GuestMenu */}
          <MainMenu />
        </div>
      )}
    </header>
  );
}
