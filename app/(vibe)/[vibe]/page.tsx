'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation' // 👈 Import this
import Link from 'next/link'
import Image from 'next/image'
import { Footer } from '@/components/footer'

interface Category {
    id: number
    name: string
    image: string
}

export default function VibePage() {
    const { vibe } = useParams()
    const slug = typeof vibe === 'string' ? vibe : ''

    // ✅ Valid slugs
    const vibeMap: Record<string, string> = {
        "happy-hour": "1",
        "exclusive-for-men": "2",
        "ladies-night": "3",
        "classy-chill": "4"
    }

    // ❗ Return 404 immediately if not valid
    if (!vibeMap[slug]) {
        notFound()
    }

    const [categories, setCategories] = useState<Category[]>([])
    const [vibeTitle, setVibeTitle] = useState(slug.replace(/-/g, ' '))
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        window.scrollTo(0, 0) // 🔥 scroll to top on mount
    }, [])


    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            setError(null)

            try {
                const vibeId = vibeMap[slug]
                const response = await fetch(`https://chat.innov8sion.com/api/venue-categories/?vibe=${vibeId}`)
                if (!response.ok) throw new Error('Failed to fetch categories')

                const data = await response.json()
                setCategories(data.data)
                setVibeTitle(data.vibe || slug.replace(/-/g, ' '))
            } catch (err) {
                setError('Failed to load categories')
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [slug])

    // ... rest of your component stays the same


    return (
        <main className="min-h-screen bg-black text-white">
            {/* 🔥 Header */}
            {/* <header className="bg-black p-4 flex items-center justify-between">
                <button className="p-1">
                    <MenuIcon className="w-6 h-6 text-white" />
                </button>
                <Link href="/">
                    <Image
                        src="/placeholder.svg?height=30&width=120&text=ChioNightOut"
                        alt="ChioNightOut"
                        width={120}
                        height={30}
                        className="h-8 w-auto"
                    />
                </Link>
                <div className="w-6" />
            </header> */}

            {/* 🔥 Breadcrumb */}
            <div className="px-4 py-2 text-sm text-zinc-400 space-x-2">
                <Link href="/" className="underline hover:text-white">Home</Link>
                <span>/</span>
                <Link href={`/${slug}`} className="text-white">{vibeTitle}</Link>
            </div>



            {/* 🔥 Hero Banner */}
            <div className="relative h-[130px] mb-8">
                <div className="absolute inset-0">
                    <Image
                        src="/placeholder.svg?height=400&width=800&text=Vibe"
                        alt={vibeTitle}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-purple-900/50" />
                </div>
                <div className="relative h-full flex items-center justify-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase text-center tracking-wider drop-shadow-[0_0_8px_#ca1f6d]">{vibeTitle.toUpperCase()}</h1>
                </div>
            </div>

            {/* 🔥 Categories Section */}
            <div className="px-4 space-y-3">
                <h2 className="text-xl font-semibold">Select Categories</h2>

                {/* ✅ Loading & Error Handling */}
                {loading && (
                    <div className="flex justify-center items-center py-8">
                        <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    </div>
                )}

                {error && <p className="text-center text-red-500">{error}</p>}

                {/* ✅ Categories Grid */}
                {!loading && !error && categories.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block"
                            >
                                <div className="relative h-[160px] rounded-md overflow-hidden group">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                        <h3 className="text-sm font-semibold text-white text-center">{category.name}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )
                }

                {/* ✅ No Categories Found */}
                {
                    !loading && !error && categories.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-zinc-400 text-lg">No categories found for this vibe.</p>
                        </div>
                    )
                }
            </div >

            {/* 🔥 Footer */}
            < div className="mt-12" >
                <Footer />
            </div >
        </main >
    );
}
