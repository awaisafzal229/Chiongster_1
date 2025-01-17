export function VenueReviews() {
  const overallRating = 4.0
  const totalReviews = 16
  const ratings = [
    { label: 'Atmosphere', value: 0.7 },
    { label: 'Personnel', value: 0.8 },
    { label: 'Price Tags', value: 0.6 },
  ]

  const reviews = [
    {
      name: 'Abhay Andhariya',
      date: 'September 12, 2024',
      rating: 5,
      ratings: {
        atmosphere: 3,
        personnel: 5,
        priceTags: 5,
      },
      comment:
        'Lorem ipsum dolor sit amet consectetur. Fermentum mi id scelerisque lorem iaculis sed sit suspendisse. In leo nullam vehicula porta diam.',
    },
    {
      name: 'Abhay Andhariya',
      date: 'September 12, 2024',
      rating: 4,
      ratings: {
        atmosphere: 3,
        personnel: 5,
        priceTags: 5,
      },
      comment:
        'Lorem ipsum dolor sit amet consectetur. Fermentum mi id scelerisque lorem iaculis sed sit suspendisse. In leo nullam vehicula porta diam.',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold">{overallRating}</span>
          <div className="flex items-center gap-2">
            <div className="flex">
              <span className="text-amber-500">{'★'.repeat(Math.floor(overallRating))}</span>
              <span className="text-zinc-600">{'★'.repeat(5 - Math.floor(overallRating))}</span>
            </div>
            <span className="text-sm text-zinc-400">
              Based on {totalReviews} reviews
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {ratings.map((rating) => (
            <div key={rating.label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{rating.label}</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${rating.value * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-zinc-900 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                👤
              </div>
              <div>
                <div className="font-medium">{review.name}</div>
                <div className="text-sm text-zinc-400">{review.date}</div>
              </div>
            </div>
            <div className="flex gap-2 text-sm">
              <div className="flex items-center gap-1">
                <span>Atmosphere: {review.ratings.atmosphere}</span>
                <span className="text-amber-500">★</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Personnel: {review.ratings.personnel}</span>
                <span className="text-amber-500">★</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Price tags: {review.ratings.priceTags}</span>
                <span className="text-amber-500">★</span>
              </div>
            </div>
            <p className="text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

