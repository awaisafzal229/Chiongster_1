'use client';

import { useState, useEffect } from 'react';
import { MainMenu } from '@/components/main-menu';
import { GuestMenu } from '@/components/guest-menu';
import { useRouter } from 'next/navigation';
import { getUser } from '@/lib/auth';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<null | { user: { email: string } }>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = () => {
      const user = getUser();
      if (user) {
        setSession({ user: { email: user.email } });
      } else {
        setSession(null);
      }
    };

    // Check on mount and when storage changes
    checkSession();
    window.addEventListener('storage', checkSession);

    return () => {
      window.removeEventListener('storage', checkSession);
    };
  }, []);

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        {session ? <MainMenu /> : <GuestMenu />}
        {children}
      </body>
    </html>
  );
}

