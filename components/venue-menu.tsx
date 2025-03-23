interface VenueMenuProps {
  menuSections: Array<{
    id: number
    header: string
    menu_items: Array<{
      id: number
      name: string
      description: string
      price: number
    }>
  }>
  menuImageSections: Array<{
    id: number
    header: string
    images: Array<{
      id: number
      image: string
    }>
  }>
}

export function VenueMenu({ menuSections, menuImageSections }: VenueMenuProps) {
  return (
    <div className="space-y-8">
      {/* Menu Sections */}
      {menuSections.map(section => (
        <div key={section.id} className="space-y-4">
          <h2 className="font-bold">{section.header}</h2>
          <div className="space-y-3">
            {section.menu_items.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900 rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </div>
                <div className="text-amber-500">{item.price}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Menu Image Sections */}
      {menuImageSections.map(section => (
        <div key={section.id} className="space-y-4">
          <h2 className="font-bold">{section.header}</h2>
          <div className="grid gap-4">
            {section.images.map((image) => (
              <div key={image.id} className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <img
                  src={image.image}
                  alt={`Menu image ${image.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
