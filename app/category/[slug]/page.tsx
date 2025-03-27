'use client'

import { useEffect, useState } from "react";
import { Heart, Share2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Footer } from '@/components/footer'
import { useSearchParams } from 'next/navigation'
// import { Header } from '@/components/header'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface District {
  id: number;
  name: string;
}
interface Category {
  id: number;
  name: string;
}

interface PromotionImage {
  id: number;
  image: string;
}

interface EventImage {
  id: number;
  image: string;
}

interface Venue {
  id: number;
  name: string;
  image: string;
  price: number;
  min_spend: string;
  districts: District[];
  categories: Category[];
  promotion_images: PromotionImage[];
  event_images: EventImage[];
  drink_dollars: number;
  distance?: number;
  slug: string;
  hours: string;
  rating: number;
  review_count: number;
}

interface Category {
  id: number;
  name: string;
}

interface Activity {
  id: number;
  name: string;
}

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: { id: number; image: string }[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}



const ImageModal = ({ isOpen, onClose, title, images, currentIndex, setCurrentIndex }: ModalProps) => {
  // Auto-slide every 3 seconds
  // useEffect(() => {
  //   if (!isOpen || images.length <= 1) return;
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [isOpen, images, setCurrentIndex]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-2xl mx-4 bg-zinc-900 rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-4">
          <h3 className="text-lg font-bold text-white text-center">{title}</h3>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Slideshow */}
        <div className="p-4">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
            <img
              src={images[currentIndex].image}
              alt={title}
              className="w-full h-full object-cover transition duration-500"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentIndex(
                      currentIndex === 0 ? images.length - 1 : currentIndex - 1
                    )
                  }
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  ←
                </button>

                <button
                  onClick={() =>
                    setCurrentIndex(
                      currentIndex === images.length - 1 ? 0 : currentIndex + 1
                    )
                  }
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                >
                  →
                </button>

              </>
            )}
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-3 gap-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-pink-500' : 'bg-zinc-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const searchParams = useSearchParams()
  const activitySlug = searchParams.get('activity')

  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(!!activitySlug);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('nearby');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [sortedVenues, setSortedVenues] = useState<Venue[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [activityId, setActivityId] = useState<number | null>(null);
  const [activityName, setActivityName] = useState<string>('');

  const [selectedPromotions, setSelectedPromotions] = useState<PromotionImage[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<EventImage[]>([]);
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);



  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const toggleFavorite = (id: number) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const getBreadcrumbs = (): Breadcrumb[] => {
    const crumbs: Breadcrumb[] = [{ label: 'Home', href: '/' }];

    if (activityName) {
      crumbs.push({ label: 'Activities', href: '/activities' });
      if (categoryName !== 'All Venues') {
        crumbs.push({ label: activityName, href: `/category/all?activity=${activitySlug}` });
        crumbs.push({ label: categoryName });
      } else {
        crumbs.push({ label: activityName });
      }
    } else {
      crumbs.push({ label: 'Categories', href: '/categories' });
      crumbs.push({ label: categoryName });
    }

    return crumbs;
  };

  // Get user's location
  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationError(null);
        },
        (error) => {
          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Please enable location access to see nearby venues';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
            default:
              errorMessage = 'An unknown error occurred getting your location';
          }
          setLocationError(errorMessage);
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    };

    getLocation();
  }, []);

  // Fetch activity info if we have an activity slug
  useEffect(() => {
    const fetchActivityInfo = async () => {
      if (!activitySlug) {
        setLoadingActivity(false);
        return;
      }

      try {
        const response = await fetch('https://chat.innov8sion.com/api/activities/');
        if (!response.ok) throw new Error('Failed to fetch activities');
        const activities: Activity[] = await response.json();

        const activity = activities.find((act) => {
          const slug = act.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return slug === activitySlug;
        });

        if (activity) {
          setActivityName(activity.name);
          setActivityId(activity.id);
        } else {
          setError('Activity not found');
        }
      } catch (error) {
        console.error('Error fetching activity info:', error);
        setError('Failed to load activity information');
      } finally {
        setLoadingActivity(false);
      }
    };

    fetchActivityInfo();
  }, [activitySlug]);

  // Fetch category info and ID
  useEffect(() => {
    const fetchCategoryInfo = async () => {
      try {
        if (params.slug === 'all') {
          setCategoryName('All Venues');
          setCategoryId(null);
          setLoadingCategory(false);
          return;
        }

        const response = await fetch('https://chat.innov8sion.com/api/venue-categories/names/');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const categories: Category[] = await response.json();

        const category = categories.find((cat) => {
          const categorySlug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return categorySlug === params.slug;
        });

        if (category) {
          setCategoryName(category.name);
          setCategoryId(category.id);
        } else {
          setError('Category not found');
        }
      } catch (error) {
        console.error('Error fetching category info:', error);
        setError('Failed to load category information');
      } finally {
        setLoadingCategory(false);
      }
    };

    fetchCategoryInfo();
  }, [params.slug]);

  // Fetch venues when we have all required data
  useEffect(() => {
    const fetchVenues = async () => {
      // Don't fetch if we're still loading category or activity info
      if (loadingCategory || loadingActivity) {
        return;
      }

      try {
        setLoading(true);

        let url = 'https://chat.innov8sion.com/api/venues/';
        const queryParams = new URLSearchParams();

        if (location) {
          queryParams.append('latitude', location.latitude.toString());
          queryParams.append('longitude', location.longitude.toString());
        }

        if (categoryId) {
          queryParams.append('category', categoryId.toString());
        }

        if (activityId) {
          queryParams.append('activity', activityId.toString());
        }

        queryParams.append('sort_by', sortBy);

        const queryString = queryParams.toString();
        if (queryString) {
          url += '?' + queryString;
        }

        console.log('\n=== Fetching Venues ===');
        console.log('URL:', url);
        console.log('Parameters:', {
          location: location ? { lat: location.latitude, lng: location.longitude } : null,
          categoryId,
          activityId,
          sortBy,
          loadingCategory,
          loadingActivity
        });

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('API Error Response:', errorData);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', {
          totalVenues: Array.isArray(data) ? data.length : 0,
          firstVenue: Array.isArray(data) && data.length > 0 ? {
            id: data[0].id,
            name: data[0].name,
            distance: data[0].distance
          } : null,
          lastVenue: Array.isArray(data) && data.length > 0 ? {
            id: data[data.length - 1].id,
            name: data[data.length - 1].name,
            distance: data[data.length - 1].distance
          } : null
        });

        setVenues(Array.isArray(data) ? data : []);
        setSortedVenues(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching venues:', err);
        setError(err instanceof Error ? err.message : 'Failed to load venues. Please try again later.');
        setVenues([]);
        setSortedVenues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [location, categoryId, activityId, sortBy, loadingCategory, loadingActivity]);

  useEffect(() => {
    let sorted = [...venues];
    console.log('\n=== Sorting Venues ===');
    console.log('Sort Method:', sortBy);
    console.log('Original Order First/Last:', venues.length > 0 ? [
      { id: venues[0].id, name: venues[0].name, distance: venues[0].distance },
      { id: venues[venues.length - 1].id, name: venues[venues.length - 1].name, distance: venues[venues.length - 1].distance }
    ] : 'No venues');

    switch (sortBy) {
      case 'nearby':
        setSortedVenues(sorted);
        break;
      case 'relevance':
        sorted.sort((a, b) => {
          const ratingA = a.drink_dollars ?? 0;
          const ratingB = b.drink_dollars ?? 0;
          return ratingB - ratingA;
        });
        setSortedVenues(sorted);
        break;
      case 'lowest_price':
        sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        setSortedVenues(sorted);
        break;
      case 'highest_price':
        sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        setSortedVenues(sorted);
        break;
      default:
        setSortedVenues(sorted);
    }

    console.log('Sorted Order First/Last:', sorted.length > 0 ? [
      { id: sorted[0].id, name: sorted[0].name, distance: sorted[0].distance },
      { id: sorted[sorted.length - 1].id, name: sorted[sorted.length - 1].name, distance: sorted[sorted.length - 1].distance }
    ] : 'No venues');
  }, [venues, sortBy]);

  if (error === 'Category not found' && !activityId) {
    return (
      <main className="min-h-screen bg-black text-white p-4 md:p-8">
        {/* <Header showBackButton backLabel="Home" /> */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-white mb-4">Category Not Found</h1>
            <p className="text-zinc-400 mb-8">This category does not exist.</p>
            <Link href="/">
              <Button variant="secondary">Go to Home</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      {/* Breadcrumb */}

      <div className="text-sm text-zinc-400 mb-4 space-x-2">
        {getBreadcrumbs().map((crumb, index, arr) => (
          <span key={crumb.label}>
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="underline hover:text-white transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-white">{crumb.label}</span>
            )}
            {index !== arr.length - 1 && <span className="mx-1">/</span>}
          </span>
        ))}
      </div>



      {/* {(loading || loadingCategory || loadingActivity) ? (
        <Header
          showBreadcrumbs
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Loading...' }
          ]}
          isLoading={true}
        />
      ) : (
        <Header showBreadcrumbs breadcrumbs={getBreadcrumbs()} />
      )} */}

      <div className="max-w-7xl mx-auto px-4">
        {locationError && (
          <div className="mb-4 mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-500 text-sm">{locationError}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {(loading || loadingCategory || loadingActivity) ? (
          <>
            {/* Skeleton Banner */}
            <div className="w-screen relative left-1/2 right-1/2 mx-[-50vw]">
              <div className="relative w-full h-[180px] bg-zinc-800 overflow-hidden mb-6 animate-pulse">
                <div className="absolute inset-0 bg-black/50 pt-3" />
              </div>
            </div>
            <div className="mb-6">
              {/* Category title skeleton */}
              <div className="animate-pulse mb-6">
                <div className="h-8 w-64 bg-zinc-800 rounded mb-4"></div>
              </div>

              {/* Sort selector skeleton */}
              <div className="flex justify-end">
                <div className="w-36 h-10 bg-zinc-800 rounded-lg animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-[#1A1A1A] rounded-lg overflow-hidden animate-pulse">
                  {/* Image placeholder */}
                  <div className="h-48 bg-zinc-800 relative">
                    {/* Distance badge placeholder */}
                    <div className="absolute top-3 right-3 w-12 h-5 bg-zinc-700 rounded-full"></div>
                    {/* Discount badge placeholder */}
                    <div className="absolute bottom-3 right-3 w-16 h-6 bg-zinc-700 rounded-lg"></div>
                  </div>

                  <div className="p-4">
                    {/* Title and buttons row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-3 flex-1">
                        <div className="h-6 w-3/4 bg-zinc-800 rounded"></div>
                        <div className="flex gap-2">
                          <div className="h-5 w-16 bg-zinc-800 rounded-full"></div>
                          <div className="h-5 w-16 bg-zinc-800 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-zinc-800 rounded-full"></div>
                        <div className="w-8 h-8 bg-zinc-800 rounded-full"></div>
                      </div>
                    </div>

                    {/* Details section */}
                    <div className="space-y-3 mb-4">
                      <div className="h-4 w-full bg-zinc-800 rounded"></div>
                      <div className="h-4 w-3/4 bg-zinc-800 rounded"></div>
                      <div className="h-4 w-1/2 bg-zinc-800 rounded"></div>
                    </div>

                    {/* Button placeholder */}
                    <div className="h-10 w-full bg-zinc-800 rounded-lg"></div>

                    {/* Promotion links placeholder */}
                    <div className="flex gap-4 mt-4">
                      <div className="h-4 w-24 bg-zinc-800 rounded"></div>
                      <div className="h-4 w-20 bg-zinc-800 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Category Banner */}
            <div className="w-screen relative left-1/2 right-1/2 mx-[-50vw]">
              <div
                className="relative w-full h-[180px] bg-cover bg-center overflow-hidden mb-6"
                style={{
                  backgroundImage: `url('/placeholder.svg?height=30&width=120&text=${encodeURIComponent(categoryName || 'ChioNightOut')}')`,
                }}
              >
                <div className="absolute inset-0 bg-black/50 pt-3" />
              </div>
            </div>
            <div className="mb-6">
              {/* <div className="flex justify-between items-center"> */}
              <h1 className="block text-2xl font-bold mt-6 mb-4 uppercase tracking-wider">
                {activityName || categoryName}
                {activityName && categoryName !== 'All Venues' && ` in ${categoryName}`}
              </h1>
              <div className="flex items-center justify-end">
                <span className="text-sm font-semibold text-white tracking-wide pr-2">
                  Sort by
                </span>
                <div className="">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="min-w-[190px] bg-transparent border border-pink-500 text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-pink-500 text-white">
                      <SelectItem
                        className={`${sortBy === 'nearby' ? 'text-pink-500' : 'text-white'} hover:bg-zinc-800`}
                        value="nearby"
                      >
                        Nearest to You
                      </SelectItem>
                      <SelectItem
                        className={`${sortBy === 'relevance' ? 'text-pink-500' : 'text-white'} hover:bg-zinc-800`}
                        value="relevance"
                      >
                        Most Relevant
                      </SelectItem>
                      <SelectItem
                        className={`${sortBy === 'lowest_price' ? 'text-pink-500' : 'text-white'} hover:bg-zinc-800`}
                        value="lowest_price"
                      >
                        Price: Low to High
                      </SelectItem>
                      <SelectItem
                        className={`${sortBy === 'highest_price' ? 'text-pink-500' : 'text-white'} hover:bg-zinc-800`}
                        value="highest_price"
                      >
                        Price: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>



              </div>
              {/* </div> */}

              {/* <p className="text-zinc-400 mt-2">
                {locationError
                  ? 'Showing all venues'
                  : location
                    ? 'Showing venues near you'
                    : 'Getting your location...'}
              </p> */}

            </div>

            {!error && venues.length === 0 && (
              <div className="text-center py-8">
                <p className="text-zinc-400">No venues found.</p>
              </div>
            )}
            <div className="space-y-4 mb-8">

              {sortedVenues.map((venue) => (
                <div key={venue.id} className="bg-[#1A1A1A] rounded-lg overflow-hidden">
                  {/* ...Image section here... */}
                  <div className="relative h-48">
                    <Image
                      src={venue.image}
                      alt={venue.name}
                      fill
                      className="object-cover"
                    />
                    {venue.distance !== undefined && (
                      <div className="absolute top-2 right-2 bg-white/90 text-black text-xs px-2 py-1 rounded-full">
                        {venue.distance < 1
                          ? `${(venue.distance * 1000).toFixed(0)}m`
                          : `${venue.distance.toFixed(1)}km`}
                      </div>
                    )}
                    {/* <div className="absolute top-3 left-3 flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(venue.id)}
                        className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${favorites.includes(venue.id) ? 'fill-red-500 text-red-500' : 'text-white'
                            }`}
                        />
                      </button>
                      <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors">
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                    </div> */}

                    {/* {venue.discount && ( */}
                    <div className="absolute bottom-2 right-5 bg-gradient-to-r from-[#512e8d] to-[#7254c4]  text-white text-sm px-4 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <span className="font-bold text-xl">{venue.drink_dollars}%</span>
                      <img
                        src="/coin.png" // 🔁 Replace with actual coin icon path
                        alt="Coin"
                        className="w-3.5 h-3.5"
                      />
                    </div>
                    {/* )} */}

                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <Link
                        href={`/venue/${venue.slug}`}
                        className="space-y-2 flex-1"
                      >
                        <h3 className="text-lg font-bold">{venue.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {venue.categories.map((d) => (
                            <span key={d.id} className="text-[10px] text-sm bg-[#321623] rounded-xl px-2 py-0.5 inline-block mt-1 text-gray-300">
                              {d.name}
                            </span>
                          ))}
                        </div>
                      </Link>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleFavorite(venue.id)}
                          className="p-2 hover:bg-zinc-800 rounded-full"
                        >
                          <Heart
                            className={`w-4 h-4 ${favorites.includes(venue.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-300'
                              }`}
                          />
                        </button>
                        <button className="p-2 hover:bg-zinc-800 rounded-full">
                          <Share2 className="w-4 h-4 text-gray-300" />
                        </button>
                      </div>
                    </div>

                    <div className="text-sm space-y-2">
                      <p>
                        <span className="text-[#FFD54A]">Price: {'$'.repeat(venue.price)}</span>{' '}
                        • <span className="text-[#FFD54A]">Drinks Min Spend: {venue.min_spend}</span>
                      </p>
                      <p className="text-zinc-400">
                        @ {venue.districts[0]?.name || 'Unknown'} •{' '}
                        {venue.hours}
                        {/* {venue.distance !== undefined
                          ? venue.distance < 1
                            ? `${(venue.distance * 1000).toFixed(0)}m`
                            : `${venue.distance.toFixed(1)}km`
                          : ''} */}
                      </p>
                      {venue.drink_dollars > 0 && (
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-300">{'★'.repeat(Math.floor(venue.rating))}{'☆'.repeat(5 - Math.floor(venue.rating))}</span>
                          <span className="text-sm text-zinc-400 ml-1">
                            {venue.rating} ({venue.review_count} reviews)
                          </span>
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/venue/${venue.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/booking`}
                    >
                      <Button className="w-full bg-gradient-to-r from-[#8E2DE2] to-[#F000FF] text-white text-sm">
                        MAKE A BOOKING
                      </Button>
                    </Link>
                    {(venue.promotion_images.length > 0 || venue.event_images.length > 0) && (
                      <div className="flex gap-4 text-sm">
                        {venue.promotion_images.length > 0 && (
                          <button
                            onClick={() => {
                              setSelectedPromotions(venue.promotion_images);
                              setIsPromotionModalOpen(true);
                            }}
                            className="text-[#DE3163] underline"
                          >
                            SEE PROMOTION
                          </button>
                        )}
                        {venue.event_images.length > 0 && (
                          <button
                            onClick={() => {
                              setSelectedEvents(venue.event_images);
                              setIsEventModalOpen(true);
                            }}
                            className="text-[#DE3163] underline"
                          >
                            SEE EVENT
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}


            </div>
          </>
        )}
      </div>

      <ImageModal
        isOpen={isPromotionModalOpen}
        onClose={() => setIsPromotionModalOpen(false)}
        title="Promotions"
        images={selectedPromotions}
        currentIndex={currentPromoIndex}
        setCurrentIndex={setCurrentPromoIndex}
      />

      <ImageModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        title="Events"
        images={selectedEvents}
        currentIndex={currentEventIndex}
        setCurrentIndex={setCurrentEventIndex}
      />

      <Footer />
    </main>
  );
}
