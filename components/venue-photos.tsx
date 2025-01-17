export function VenuePhotos() {
  const photos = Array(9).fill('/placeholder.svg?height=300&width=300&text=Venue+Photo')

  return (
    <div className="grid grid-cols-3 gap-1">
      {photos.map((photo, index) => (
        <div key={index} className="aspect-square relative">
          <img
            src={photo}
            alt={`Venue photo ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

