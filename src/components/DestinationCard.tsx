"use client";

import * as React from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { MapPin, Calendar, Star, ArrowUpRight } from "lucide-react";
import { Destination } from "@/types/destination";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const fallbackImages = [
  "/images/destinations/image6.png",
  "/images/destinations/image5.png",
  "/images/destinations/image4.png",
  "/images/destinations/image3.png",
  "/images/destinations/image2.png",
  "/images/destinations/image1.png",
];

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

export default function DestinationCard({
  destination,
  index,
}: DestinationCardProps) {
  const defaultImage = fallbackImages[index % fallbackImages.length];
  const [imgSrc, setImgSrc] = React.useState<string>(() => {
    if (destination.imageUrl && destination.imageUrl.startsWith("http")) {
      return destination.imageUrl;
    }
    if (destination.imageUrl && destination.imageUrl.startsWith("/")) {
      return destination.imageUrl;
    }
    return defaultImage;
  });

  const [hasError, setHasError] = React.useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(defaultImage);
    }
  };

  // Clean formatted price without double $ signs
  const rawPrice = String(destination.price || "2700").replace(/[^0-9.]/g, "");
  const priceDisplay = rawPrice || "2700";

  // Clean formatted duration
  let durationDisplay = destination.duration || "7 Days/6 Nights";
  if (/^\d+$/.test(durationDisplay.trim())) {
    durationDisplay = `${durationDisplay.trim()} Days`;
  }

  return (
    <article className="group flex flex-col">
      {/* Destination Image with Badge */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={destination.destinationName || "Destination"}
          loading="lazy"
          onError={handleImageError}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/85 backdrop-blur-xs px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-xs">
          <span>{destination.rating ?? "4.5"}</span>
          <Star className="h-3 w-3 fill-gray-900 text-gray-900" />
        </div>
      </div>

      {/* Destination Details */}
      <div className="pt-3.5 flex flex-col">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          <span className="capitalize">{destination.country || "Nepal"}</span>
        </div>

        {/* Name and Price */}
        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <h2
            className={`${playfair.className} text-xl sm:text-[22px] font-medium text-gray-900 capitalize tracking-tight transition-colors group-hover:text-cyan-700 truncate`}
            title={destination.destinationName}
          >
            {destination.destinationName || "Bali Paradise"}
          </h2>
          <div className="text-right whitespace-nowrap shrink-0">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              ${priceDisplay}
            </span>
            <span className="text-xs text-gray-500 font-normal">/Person</span>
          </div>
        </div>

        {/* Duration */}
        <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
          <Calendar className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          <span>{durationDisplay}</span>
        </div>

        {/* Book Now Action */}
        <div className="mt-3.5">
          <Link
            href={`/destinations/${destination._id || destination.id || index}`}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#15a1bf] hover:text-cyan-700 transition-colors group/link"
          >
            <span>BOOK NOW</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
