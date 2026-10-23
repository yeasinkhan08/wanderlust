import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime 3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export default function Banner() {
  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80')",
      }}
    >
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 pb-32 pt-24 text-center">
        <h1 className="max-w-3xl text-5xl font-bold leading-tight text-white drop-shadow md:text-6xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/90 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 bg-cyan-600 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-cyan-700"
          >
            Explore Now
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="bg-white/80 px-8 py-3 text-sm font-bold uppercase tracking-wide text-gray-800 transition-colors hover:bg-white"
          >
            View Destination
          </button>
        </div>
      </div>

      {/* Search bar pinned to the bottom of the banner */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-6xl flex-wrap items-stretch bg-gray-100/90 backdrop-blur">
          {searchFields.map((field) => (
            <div
              key={field.label}
              className="flex-1 border-r border-gray-300 px-6 py-4 text-left"
            >
              <p className="text-sm font-bold text-gray-800">{field.label}</p>
              <p className="mt-0.5 text-xs text-gray-500">
                {field.placeholder}
              </p>
            </div>
          ))}
          <button
            type="button"
            className="bg-cyan-600 px-12 py-4 text-sm font-bold text-white transition-colors hover:bg-cyan-700"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
