import Link from 'next/link'

interface VenueCardProps {
  title: string
  image: string
  slug?: string
}

export function VenueCard({ title, image, slug }: VenueCardProps) {
  const href = slug ? `/category/${slug}` : '#'

  return (
    <Link href={href}>
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10" />
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex items-center justify-center">
          <h3 className="text-md font-semibold text-center px-3 py-2 ">{title}</h3>
        </div>
      </div>
    </Link>
  )
}
