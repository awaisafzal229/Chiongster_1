import { Target, PocketIcon as Pool, Music, ClubIcon as Football } from 'lucide-react'

export function InterestSection() {
  const interests = [
    { icon: Target, label: 'Darts' },
    { icon: Pool, label: 'Pool' },
    { icon: Music, label: 'Live Performance' },
    { icon: Football, label: 'Live Soccer' },
  ]

  return (
    <section className="space-y-4">
      <div className="space-y-1 text-center">
        <p className="text-[#FFD54A] text-base font-medium">Tailor Your Experience</p>
        <h2 className="text-3xl font-bold text-white font-futura">DISCOVER BY INTEREST</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {interests.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center justify-center p-6 bg-zinc-900 rounded-lg space-y-2 hover:bg-zinc-800 transition-colors"
          >
            <Icon className="w-8 h-8 text-purple-500" />
            <span className="text-base font-medium">{label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

