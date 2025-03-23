export interface District {
  id: number
  name: string
}

export interface Venue {
  id: number
  name: string
  slug: string
  image?: string
  price: number
  min_spend: string
  districts: District[]
  promotion_images: string[]
  event_images: string[]
  drink_dollars: number
  rating: number
  review_count: number
  distance: number
  categories?: string[]
}

export interface TopPick {
  id: number
  venue: Venue
  sequence: number
}
