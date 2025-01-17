'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MainMenu } from './main-menu'

export function Header() {
  return (
    <header className="bg-black">
      <div className="flex items-center justify-between p-8">
        <div className="flex items-center">
          <MainMenu />
          <Link href="/">
            <Image
              src="https://oppstech.cloud/assets/chiongster-logo.jpg"
              alt="ChioNightOut"
              width={120}
              height={30}
              className="h-8 w-auto ml-3"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

