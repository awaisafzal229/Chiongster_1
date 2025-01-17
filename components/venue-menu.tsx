export function VenueMenu() {
  const mustTryItems = [
    {
      name: 'Popcorn Chicken',
      description: 'Crispy Fried Chicken Bites',
      price: 18,
    },
    {
      name: 'Popcorn Chicken',
      description: 'Crispy Fried Chicken Bites',
      price: 18,
    },
    {
      name: 'Popcorn Chicken',
      description: 'Crispy Fried Chicken Bites',
      price: 18,
    },
  ]

  const promotions = [
    '/placeholder.svg?height=300&width=400&text=Promotion+1',
    '/placeholder.svg?height=300&width=400&text=Promotion+2',
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-bold">MUST TRY</h2>
        <div className="space-y-3">
          {mustTryItems.map((item, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-zinc-400">{item.description}</p>
              </div>
              <div className="text-amber-500">${item.price}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold">ALL PROMOTION</h2>
        <div className="grid gap-4">
          {promotions.map((promotion, index) => (
            <div key={index} className="aspect-[4/3] relative rounded-lg overflow-hidden">
              <img
                src={promotion}
                alt={`Promotion ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

