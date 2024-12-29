interface CategoryCardProps {
  title: string
  image: string
}

export function CategoryCard({ title, image }: CategoryCardProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10" />
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 h-full flex items-end p-3">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  )
}

