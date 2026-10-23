"use client";

import * as React from "react";
import { Playfair_Display } from "next/font/google";
import { ChevronDown, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Destination } from "@/types/destination";
import DestinationCard from "@/components/DestinationCard";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const defaultMockDestinations: Destination[] = [
  {
    _id: "mock-1",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Beach",
    price: "2700",
    duration: "7 Days/6 Nights",
    imageUrl: "/images/destinations/image6.png",
    rating: 4.5,
  },
  {
    _id: "mock-2",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Beach",
    price: "2700",
    duration: "7 Days/6 Nights",
    imageUrl: "/images/destinations/image5.png",
    rating: 4.5,
  },
  {
    _id: "mock-3",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Mountain",
    price: "2700",
    duration: "7 Days/6 Nights",
    imageUrl: "/images/destinations/image4.png",
    rating: 4.5,
  },
  {
    _id: "mock-4",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Cultural",
    price: "2700",
    duration: "7 Days/6 Nights",
    imageUrl: "/images/destinations/image3.png",
    rating: 4.5,
  },
  {
    _id: "mock-5",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Beach",
    price: "2700",
    duration: "7 Days/6 Nights",
    imageUrl: "/images/destinations/image2.png",
    rating: 4.5,
  },
  {
    _id: "mock-6",
    destinationName: "Bali Paradise",
    country: "Nepal",
    category: "Adventure",
    price: "2700",
    duration: "7 Days/6 Nights",
    imageUrl: "/images/destinations/image1.png",
    rating: 4.5,
  },
];

const availableCategories = [
  "Beach",
  "Mountain",
  "Adventure",
  "Cultural",
  "City Tour",
  "Wildlife & Safari",
  "Luxury",
  "Romantic",
];

interface DestinationsCatalogProps {
  initialDestinations?: Destination[];
}

export default function DestinationsCatalog({
  initialDestinations = [],
}: DestinationsCatalogProps) {
  // Use backend data if present, otherwise fallback to default curated mock data
  const baseDestinations =
    initialDestinations.length > 0
      ? initialDestinations
      : defaultMockDestinations;

  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [selectedPriceRange, setSelectedPriceRange] =
    React.useState<string>("All");
  const [sortBy, setSortBy] = React.useState<string>("default");

  // Filtering
  let filtered = baseDestinations.filter((item) => {
    // Category match
    if (
      selectedCategory !== "All" &&
      item.category?.toLowerCase() !== selectedCategory.toLowerCase()
    ) {
      return false;
    }

    // Price range match
    const numPrice = Number(String(item.price || "0").replace(/[^0-9.]/g, ""));
    if (selectedPriceRange === "under-500" && numPrice >= 500) {
      return false;
    }
    if (
      selectedPriceRange === "500-1000" &&
      (numPrice < 500 || numPrice > 1000)
    ) {
      return false;
    }
    if (
      selectedPriceRange === "1000-2000" &&
      (numPrice < 1000 || numPrice > 2000)
    ) {
      return false;
    }
    if (selectedPriceRange === "above-2000" && numPrice < 2000) {
      return false;
    }

    return true;
  });

  // Sorting
  if (sortBy === "price-low") {
    filtered = [...filtered].sort((a, b) => {
      const pA = Number(String(a.price || "0").replace(/[^0-9.]/g, ""));
      const pB = Number(String(b.price || "0").replace(/[^0-9.]/g, ""));
      return pA - pB;
    });
  } else if (sortBy === "price-high") {
    filtered = [...filtered].sort((a, b) => {
      const pA = Number(String(a.price || "0").replace(/[^0-9.]/g, ""));
      const pB = Number(String(b.price || "0").replace(/[^0-9.]/g, ""));
      return pB - pA;
    });
  } else if (sortBy === "name") {
    filtered = [...filtered].sort((a, b) =>
      a.destinationName.localeCompare(b.destinationName)
    );
  }

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRange("All");
    setSortBy("default");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white py-12 md:py-16 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <header className="mb-8">
          <h1
            className={`${playfair.className} text-4xl sm:text-5xl md:text-[54px] font-normal tracking-tight text-[#0f172a]`}
          >
            Explore All Destinations
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500 font-normal">
            Find your perfect travel experience from our curated collection
          </p>
        </header>

        {/* Unified Filter Bar matching design */}
        <section
          aria-label="Filter destinations"
          className="border border-gray-300 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300 bg-white"
        >
          {/* Category Filter */}
          <div className="relative">
            <select
              aria-label="Filter by category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-transparent px-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-700 cursor-pointer focus:outline-none pr-10"
            >
              <option value="All">CATEGORY</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>

          {/* Price Range Filter */}
          <div className="relative">
            <select
              aria-label="Filter by price range"
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full appearance-none bg-transparent px-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-700 cursor-pointer focus:outline-none pr-10"
            >
              <option value="All">PRICE RANGE</option>
              <option value="under-500">Under $500</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000-2000">$1,000 - $2,000</option>
              <option value="above-2000">$2,000 &amp; Above</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>

          {/* Sort By Filter */}
          <div className="relative">
            <select
              aria-label="Sort destinations"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-transparent px-5 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-700 cursor-pointer focus:outline-none pr-10"
            >
              <option value="default">SORT BY</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Destination Name</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
        </section>

        {/* Showing Count */}
        <div className="mt-4 mb-8 flex items-center justify-between">
          <p className="text-sm text-gray-500 font-normal">
            Showing {filtered.length} destination
            {filtered.length === 1 ? "" : "s"}
          </p>

          {(selectedCategory !== "All" ||
            selectedPriceRange !== "All" ||
            sortBy !== "default") && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 hover:text-cyan-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
        </div>

        {/* Destinations Grid mapped using Array.prototype.map */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 sm:gap-y-12">
            {filtered.map((destination: Destination, index: number) => (
              <DestinationCard
                key={destination._id || destination.id || `dest-${index}`}
                destination={destination}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-gray-300 py-16 text-center">
            <SlidersHorizontal className="mx-auto h-8 w-8 text-gray-400 mb-3" />
            <p className="text-base font-medium text-gray-700">
              No destinations match your selected criteria.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your category or price range filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center gap-2 bg-cyan-600 px-5 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-cyan-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
