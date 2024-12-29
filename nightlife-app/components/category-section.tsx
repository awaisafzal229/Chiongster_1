import { CategoryCard } from './category-card'

export function CategorySection() {
  const categories = [
    { title: 'Happy hour', image: '/placeholder.svg?height=200&width=200&text=Happy+Hour' },
    { title: 'Activities', image: '/placeholder.svg?height=200&width=200&text=Activities' },
  ]
  
  const categories2 = [
    { title: 'Exclusive For Men', image: '/placeholder.svg?height=200&width=200&text=Exclusive+For+Men' },
    { title: 'Ladies Night', image: '/placeholder.svg?height=200&width=200&text=Ladies+Night' },
    { title: 'Classy Chill', image: '/placeholder.svg?height=200&width=200&text=Classy+Chill' },
  ]

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <p className="text-amber-500 text-sm">Find Your Perfect Place</p>
        <h2 className="text-2xl font-bold">CHOOSE YOUR VIBE</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            image={category.image}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {categories2.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            image={category.image}
          />
        ))}
      </div>
    </section>
  )
}

