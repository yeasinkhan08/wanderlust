import React from "react";
import type { Metadata } from "next";
import DestinationDetailsClient from "@/components/DestinationDetailsClient";
import { defaultMockDestinations } from "@/data/destinations";
import { Destination } from "@/types/destination";

interface DestinationDetailsPageProps {
  params: Promise<{ id: string }>;
}

const defaultDestinationData: Destination = {
  _id: "bali-paradise",
  destinationName: "Bali Paradise",
  country: "Indonesia",
  category: "Beach",
  price: "1299",
  duration: "7 Days / 6 Nights",
  departureDate: "05/15/2026",
  imageUrl: "/cta-airplane-bg.jpg",
  rating: 4.9,
  reviewsCount: "234 reviews",
  description:
    "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.",
  highlights: [
    "Luxury beachfront accommodation",
    "Traditional Balinese spa treatment",
    "Sunrise trek to Mount Batur",
    "Visit Uluwatu Temple at sunset",
    "Private beach dinner experience",
  ],
};

async function getDestinationById(id: string): Promise<Destination> {
  // 1. Try to fetch from backend API
  try {
    const res = await fetch(`http://localhost:8000/destination/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data && (data._id || data.destinationName)) {
        return {
          ...defaultDestinationData,
          ...data,
          destinationName:
            data.destinationName || defaultDestinationData.destinationName,
          country: data.country || defaultDestinationData.country,
          price: data.price || defaultDestinationData.price,
          duration: data.duration || defaultDestinationData.duration,
          departureDate:
            data.departureDate || defaultDestinationData.departureDate,
          imageUrl: data.imageUrl || defaultDestinationData.imageUrl,
          description: data.description || defaultDestinationData.description,
        };
      }
    }
  } catch {
    try {
      const res = await fetch(`http://127.0.0.1:8000/destination/${id}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        if (data && (data._id || data.destinationName)) {
          return {
            ...defaultDestinationData,
            ...data,
            destinationName:
              data.destinationName || defaultDestinationData.destinationName,
            country: data.country || defaultDestinationData.country,
            price: data.price || defaultDestinationData.price,
            duration: data.duration || defaultDestinationData.duration,
            departureDate:
              data.departureDate || defaultDestinationData.departureDate,
            imageUrl: data.imageUrl || defaultDestinationData.imageUrl,
            description: data.description || defaultDestinationData.description,
          };
        }
      }
    } catch (error) {
      console.warn(
        "Could not reach backend destination endpoint, checking mocks:",
        error,
      );
    }
  }

  // 2. Check mock destinations
  const matchedMock = defaultMockDestinations.find(
    (item) => item._id === id || item.id === id,
  );
  if (matchedMock) {
    return {
      ...defaultDestinationData,
      ...matchedMock,
      imageUrl: matchedMock.imageUrl || defaultDestinationData.imageUrl,
    };
  }

  // 3. Fallback to default Bali Paradise destination
  return {
    ...defaultDestinationData,
    _id: id,
  };
}

export async function generateMetadata({
  params,
}: DestinationDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const destination = await getDestinationById(id);
  return {
    title: `${destination.destinationName} | Wanderlust Travel`,
    description:
      destination.description ||
      `Explore ${destination.destinationName} in ${destination.country} with Wanderlust.`,
  };
}

const DestinationDetailsPage = async ({
  params,
}: DestinationDetailsPageProps) => {
  const { id } = await params;
  const destination = await getDestinationById(id);

  return <DestinationDetailsClient initialDestination={destination} />;
};

export default DestinationDetailsPage;
