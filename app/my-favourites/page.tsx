'use client'

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Footer } from "@/components/footer";

const venues = [
    {
        id: 1,
        name: 'Empire KTV',
        type: 'KTV Nightclub',
        categories: ['ktv-nightclub'],
        image: '/placeholder.svg?height=400&width=600&text=Empire+KTV',
        rating: 4,
        reviews: 16,
        price: '$$$$$',
        minSpend: '$78/tower',
        location: 'Orchard',
        hours: '3:00pm - 11:00pm',
        distance: '0.2KM',
        discount: '10% OFF',
        tags: ['KTV Nightclub']
    },
    {
        id: 2,
        name: 'Marquee',
        type: 'Thai Disco',
        categories: ['thai-disco', 'boys-club'],
        image: '/placeholder.svg?height=400&width=600&text=Marquee',
        rating: 4,
        reviews: 10,
        price: '$$$$$',
        minSpend: '$78/tower',
        location: 'Bugis',
        hours: '4:00pm - 3:00am',
        distance: '0.2KM',
        discount: '10% OFF',
        tags: ['Thai Disco', 'Boys Club']
    },
    {
        id: 3,
        name: 'The Pub',
        type: 'Pub',
        categories: ['pub'],
        image: '/placeholder.svg?height=400&width=600&text=The+Pub',
        rating: 4.5,
        reviews: 32,
        price: '$$$',
        minSpend: '$40/person',
        location: 'Clarke Quay',
        hours: '5:00pm - 2:00am',
        distance: '0.5KM',
        discount: '15% OFF',
        tags: ['Pub']
    },
    {
        id: 4,
        name: 'Lounge & Chill',
        type: 'Lounge & Bar',
        categories: ['lounge-and-bar'],
        image: '/placeholder.svg?height=400&width=600&text=Lounge+%26+Chill',
        rating: 4.2,
        reviews: 24,
        price: '$$$$',
        minSpend: '$50/person',
        location: 'Marina Bay',
        hours: '6:00pm - 3:00am',
        distance: '0.8KM',
        discount: '5% OFF',
        tags: ['Lounge', 'Bar']
    },
    {
        id: 5,
        name: 'Family Sing-Along',
        type: 'Family KTV',
        categories: ['family-ktv'],
        image: '/placeholder.svg?height=400&width=600&text=Family+Sing-Along',
        rating: 4.3,
        reviews: 45,
        price: '$$',
        minSpend: '$30/person',
        location: 'Tampines',
        hours: '12:00pm - 10:00pm',
        distance: '1.2KM',
        tags: ['Family KTV']
    },
    {
        id: 6,
        name: 'NEw KTV',
        type: 'KTV Nightclub',
        categories: ['ktv-nightclub'],
        image: '/placeholder.svg?height=400&width=600&text=Empire+KTV',
        rating: 5,
        reviews: 21,
        price: '$$$',
        minSpend: '$109/tower',
        location: 'Orchard',
        hours: '3:00pm - 04:00am',
        distance: '1.2KM',
        discount: '5% OFF',
        tags: ['KTV Nightclub']
    },
]

export default function MyFavourites() {
    const [favorites, setFavorites] = useState<number[]>([]);
    const [favoriteVenues, setFavoriteVenues] = useState<typeof venues>([]);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(storedFavorites);

        // Filter only favorite venues
        setFavoriteVenues(venues.filter((venue) => storedFavorites.includes(venue.id)));
    }, []);

    const toggleFavorite = (id: number) => {
        const updatedFavorites = favorites.includes(id)
            ? favorites.filter((favId) => favId !== id)
            : [...favorites, id];

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavoriteVenues(venues.filter((venue) => updatedFavorites.includes(venue.id)));
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Breadcrumb */}
            <div className="text-sm text-zinc-400 mb-4">
                <span>Home</span>
                <span className="mx-2">/</span>
                <span>My Favourites</span>
                <span className="mx-2">/</span>
                {/* <span className="text-white">{categoryName}</span> */}
            </div>
            <h1 className="text-3xl font-bold mb-4">My Favourites</h1>

            {favoriteVenues.length === 0 ? (
                <p>No favourites added yet.</p>
            ) : (
                <div className="space-y-4">
                    {favoriteVenues.map((venue) => (
                        <div key={venue.id} className="bg-zinc-900 rounded-lg overflow-hidden">
                            <div className="relative">
                                <span className="absolute top-2 right-2 bg-white/90 text-black text-xs px-2 py-1 rounded-full">
                                    {venue.distance}
                                </span>
                                <img
                                    src={venue.image}
                                    alt={venue.name}
                                    className="w-full h-48 object-cover"
                                />
                                {venue.discount && (
                                    <div className="absolute bottom-2 right-2 bg-purple-600 text-white text-sm px-3 py-1 rounded-lg">
                                        {venue.discount}
                                    </div>
                                )}
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold">{venue.name}</h3>
                                        <div className="flex gap-2 mt-1">
                                            {venue.tags.map((tag) => (
                                                <span key={tag} className="text-sm bg-[#953553] rounded-lg px-2 py-1 text-white">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => toggleFavorite(venue.id)} className="p-2 hover:bg-zinc-800 rounded-full">
                                            <Heart className={`w-5 h-5 ${favorites.includes(venue.id) ? 'text-red-500' : ''}`} />
                                        </button>

                                        <button className="p-2 hover:bg-zinc-800 rounded-full">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm">
                                        <span className="text-[#FFD54A]">Price: {venue.price}</span> •{' '}
                                        <span className="text-[#FFD54A]">Drinks Min Spend: {venue.minSpend}</span>
                                    </p>
                                    <p className="text-sm text-zinc-400">
                                        @ {venue.location} • {venue.hours}
                                    </p>
                                    <div className="flex items-center mt-1">
                                        <span className="text-yellow-300">{'★'.repeat(Math.floor(venue.rating))}{'☆'.repeat(5 - Math.floor(venue.rating))}</span>
                                        <span className="text-sm text-zinc-400 ml-1">
                                            {venue.rating} ({venue.reviews} reviews)
                                        </span>
                                    </div>
                                </div>

                                <Link href={`/venue/${venue.slug}`}>
                                    <Button className="w-full bg-gradient-to-r from-[#8E2DE2] to-[#F000FF] text-white">
                                        MAKE A BOOKING
                                    </Button>
                                </Link>

                                <div className="flex gap-4 text-sm">
                                    <button className="text-[#DE3163] underline">
                                        SEE PROMOTION
                                    </button>
                                    <button className="text-[#DE3163] underline">
                                        SEE EVENT
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            )}
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
                {/* Previous Button */}
                <button className="p-2 rounded-md bg-zinc-900 text-zinc-400 hover:bg-zinc-800">
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Pagination Buttons */}
                {[1, 2, 3].map((page) => (
                    <button
                        key={page}
                        className={`w-8 h-8 rounded-md border ${currentPage === page
                            ? 'border-pink-500 bg-zinc-900 text-white' // Selected page
                            : 'border-transparent bg-zinc-800 text-zinc-400 hover:bg-zinc-700' // Unselected page
                            }`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                <button className="p-2 rounded-md bg-zinc-900 text-zinc-400 hover:bg-zinc-800">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>



            <Footer />
        </div>
    );
}
