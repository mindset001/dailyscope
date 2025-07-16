import SpotlightCard from "./SpotlightCard";


const spotlightData = new Array(9).fill(null).map(() => ({
  image: "/sample.jpg",
  title: "Digital art in voices",
  author: "Adam Lukot",
  location: "Lagos Nigeria",
  tags: ["Digital art", "Installation"], // ✅ this must be an array
}));

export default function SpotlightGrid() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Search contributors…"
          className="border px-4 py-2 rounded-md w-full sm:w-[300px]"
        />
        <select className="border px-4 py-2 rounded-md w-full sm:w-[200px]">
          <option>All Categories</option>
          <option>Digital art</option>
          <option>Installation</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {spotlightData.map((item, idx) => (
          <SpotlightCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}
