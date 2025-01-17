interface BlogCardProps {
  date: string
  title: string
  tags: string[]
  description: string
  image: string
}

export function BlogCard({ date, title, tags, description, image }: BlogCardProps) {
  return (
    <div className="space-y-2 h-full bg-zinc-900 rounded-lg overflow-hidden">
      <div className="relative aspect-[16/9]">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4 space-y-2">
        <p className="text-sm text-zinc-400">{date}</p>
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-lg bg-[#953553] text-purple-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-zinc-400 line-clamp-2">{description}</p>
        <button className="text-[#DE3163] underline hover:text-[#DE3163] text-sm font-medium flex items-center gap-1">
          READ DETAILS
          <span className="text-base text-white no-underline"></span>
        </button>
      </div>
    </div>
  )
}

