'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Activity {
  id: number
  name: string
  icon: string
}

export function InterestSection() {
  const router = useRouter()
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    fetch('https://chat.innov8sion.com/api/activities/')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error))
  }, [])

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const handleActivityClick = (activityName: string) => {
    setSelectedActivity(activityName);
    setIsNavigating(true);

    setTimeout(() => {
      router.push(`/category/all?activity=${generateSlug(activityName)}`);
    }, 400);
  };

  return (
    <section className={`space-y-8 transition-transform duration-500 ${isNavigating ? 'translate-x-[-100vw]' : ''}`}>
      <div className="space-y-1 text-center">
        <p className="text-[#FFD54A] text-base font-medium">Tailor Your Experience</p>
        <h2 className="text-3xl font-bold text-white font-futura">DISCOVER BY INTEREST</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {activities.map((activity, index) => (
          <button
            key={activity.id}
            onClick={() => handleActivityClick(activity.name)}
            className={`group flex flex-col items-center justify-center p-4 bg-[#282728] backdrop-blur-sm rounded-lg space-y-2 hover:bg-zinc-800/70 transition-all duration-300 ${selectedActivity === activity.name ? 'translate-x-[120%] opacity-0 scale-95' : ''
              }`}
            style={{
              transitionDelay: selectedActivity === activity.name ? `${index * 50}ms` : '0ms'
            }}
          >
            <div className="  p-2 rounded-full">
              <Image
                src={activity.icon}
                alt={activity.name}
                width={24}
                height={24}
                className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-sm font-medium text-white text-center">
              {activity.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
