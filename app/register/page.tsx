'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { setAuthTokens, setUser } from '@/lib/auth'

export default function RegisterPage() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_HOST;


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        phone_number: phoneNumber,
        email,
        password
      };

      const response = await fetch(`${API_BASE_URL}/auth/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();

      // Store tokens and user data using our auth utilities
      setAuthTokens({
        access_token: data.access_token,
        refresh_token: data.refresh_token
      });

      setUser({
        phone_number: data.phone_number,
        email: data.email
      });

      console.log("User registered successfully");
      // Redirect to home page since user is now logged in
      window.location.href = '/';
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred during registration');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-white">Create account</h1>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400" htmlFor="username">
                Contact # :
              </label>
              <Input
                id="phoneNUmber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Input Contact #"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Input Email"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Input Password"
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-zinc-400" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full h-12 text-white text-base font-medium bg-gradient-to-r from-[#8E2DE2] to-[#F000FF]",
                "hover:from-[#7B27C1] hover:to-[#C000E0]",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
            </Button>
          </form>

          <p className="text-center text-zinc-400">
            Already have an account?{' '}
            <Link href="/login" className="text-[#FF1493] hover:text-[#FF1493]/90">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
