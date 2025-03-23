import Link from 'next/link'
import { CategoryCard } from './category-card'

export function CategorySection() {
  const categories = [
    { title: 'Happy Hour', image: '/placeholder.svg?height=200&width=200&text=Happy+Hour', path: '/happy-hour' },
    { title: 'Activities', image: '/placeholder.svg?height=200&width=200&text=Activities', path: '/activities' },
  ]

  const categories2 = [
    { title: 'Exclusive For Men', image: '/placeholder.svg?height=200&width=200&text=Exclusive+For+Men', path: '/exclusive-for-men' },
    { title: 'Ladies Night', image: '/placeholder.svg?height=200&width=200&text=Ladies+Night', path: '/ladies-night' },
    { title: 'Classy Chill', image: '/placeholder.svg?height=200&width=200&text=Classy+Chill', path: '/classy-chill' },
  ]

  return (
    <section className="space-y-6 p-2">
      <div className="space-y-1 text-center">
        <p className="text-[#FFD54A] text-base font-medium">Find Your Perfect Place</p>
        <h2 className="text-3xl font-bold text-white font-futura">CHOOSE YOUR VIBE</h2>
      </div>

      {/* First Category Grid */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Link key={category.title} href={category.path} passHref>
            <div className="cursor-pointer">
              <CategoryCard
                title={category.title}
                image={category.image}
                className="bg-zinc-900 text-white rounded-lg overflow-hidden shadow-lg hover:opacity-80 transition"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Second Category Grid */}
      <div className="grid grid-cols-3 gap-4">
        {categories2.map((category) => (
          <Link key={category.title} href={category.path} passHref>
            <div className="cursor-pointer">
              <CategoryCard
                title={category.title}
                image={category.image}
                className="bg-zinc-900 text-white rounded-lg overflow-hidden shadow-lg hover:opacity-80 transition"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
