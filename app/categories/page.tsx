'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ArrowRight, Loader2 } from 'lucide-react'

interface Category {
  id: number;
  name: string;
  image: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...');
        const response = await fetch("https://chat.innov8sion.com/api/venue-categories/details/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) throw new Error('Failed to fetch categories');

        const data = await response.json();
        console.log('Categories data:', data);
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Header 
        showBreadcrumbs 
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Categories' }
        ]}
      />

      <div className="relative h-[300px] mb-12">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=600&width=1200&text=Explore+Categories"
            alt="Categories"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-black" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Explore Categories</h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Discover the perfect venue for your next adventure
          </p>
        </div>
      </div>

      <div className="px-4 space-y-8 max-w-7xl mx-auto mb-12">
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary-500 animate-spin mb-4" />
            <p className="text-zinc-400">Loading categories...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg">No categories found.</p>
          </div>
        )}

        {!loading && !error && categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${generateSlug(category.name)}`}
                className="group relative overflow-hidden rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                    <ArrowRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
