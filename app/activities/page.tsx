'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MenuIcon } from 'lucide-react'
import { Footer } from '@/components/footer'
import { useRouter } from 'next/navigation'

interface Activity {
    id: number;
    name: string;
    icon: string;
}

export default function ActivitiesPage() {
    const router = useRouter();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        window.scrollTo(0, 0) // 🔥 scroll to top on mount
    }, [])


    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch("https://chat.innov8sion.com/api/activities/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch activities');

                const data = await response.json();
                setActivities(data);
            } catch (err) {
                console.error('Error fetching activities:', err);
                setError("Failed to load activities");
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Header */}
            {/* <header className="bg-black p-4 flex items-center justify-between">
                <button className="p-1">
                    <MenuIcon className="w-6 h-6" />
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

            {/* Breadcrumb */}
            <div className="px-4 py-2 text-sm text-zinc-400 space-x-2">
                <Link href="/" className="underline hover:text-white">Home</Link>
                <span>/</span>
                <Link href={"/activities"} className="text-white">Activities</Link>
            </div>


            {/* Hero Banner */}
            <div className="relative h-[130px] mb-8">
                <div className="absolute inset-0">
                    <Image
                        src="/placeholder.svg?height=400&width=800&text=Activities"
                        alt="Activities"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-purple-900/50" />
                </div>
                <div className="relative h-full flex items-center justify-center">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase text-center tracking-wider drop-shadow-[0_0_8px_#ca1f6d]">
                        ACTIVITIES
                    </h1>

                </div>
            </div>

            {/* Activities List */}
            <div className="px-6 space-y-6">
                {loading && <p className="text-center text-zinc-400">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && activities.length === 0 && (
                    <p className="text-center text-zinc-400">No activities found.</p>
                )}
                {!loading && !error && activities.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {activities.map((activity) => (
                            <button
                                key={activity.id}
                                onClick={() =>
                                    router.push(`/category/all?activity=${activity.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`)
                                }
                                className="flex items-center justify-between p-3 bg-zinc-900 hover:bg-zinc-800 rounded-lg shadow-sm transition-all"
                            >
                                <div className="flex items-center space-x-4">
                                    <Image
                                        src={activity.icon}
                                        alt={activity.name}
                                        width={32}
                                        height={32}
                                        className="rounded-md"
                                    />
                                    <span className="text-sm font-medium text-white">{activity.name}</span>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-zinc-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        ))}

                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-12">
                <Footer />
            </div>
        </main>
    );
}
