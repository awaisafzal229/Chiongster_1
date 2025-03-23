interface VenuePhotosProps {
  gallerySections: Array<{
    id: number
    random_image_count: number
    images: {
      fixed: Array<{
        id: number
        image: string
        sequence: number
      }>
      random: Array<{
        id: number
        image: string
        sequence: null
      }>
    }
  }>
}

export function VenuePhotos({ gallerySections }: VenuePhotosProps) {
  // Combine and sort fixed images by sequence, then append random images
  const allImages = gallerySections.flatMap(section => {
    const fixedImages = [...section.images.fixed].sort((a, b) => a.sequence - b.sequence)
    const randomImages = section.images.random.slice(0, section.random_image_count)
    return [...fixedImages, ...randomImages]
  })

  return (
    <div className="grid grid-cols-3 gap-1">
      {allImages.map((image) => (
        <div key={image.id} className="aspect-square relative">
          <img
            src={image.image}
            alt={`Venue photo ${image.id}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
