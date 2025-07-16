interface SpotlightProps {
  image: string;
  title: string;
  author: string;
  location: string;
  tags?: string[];
}

export default function SpotlightCard({
  image,
  title,
  author,
  location,
  tags = [],
}: SpotlightProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm border bg-white">
      <div className="relative h-[200px] w-full">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full brightness-[.65]"
        />
        <div className="absolute bottom-3 left-3 text-white">
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm">By {author}</p>
        </div>
      </div>

      <div className="p-4">
        <p className="flex items-center gap-1 text-sm text-gray-500">
          📍 {location}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
