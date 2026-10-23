import type { Metadata } from "next";
import DestinationsCatalog from "@/components/DestinationsCatalog";
import { Destination } from "@/types/destination";

export const metadata: Metadata = {
  title: "Explore All Destinations | Wanderlust",
  description:
    "Find your perfect travel experience from our curated collection of destinations.",
};

const allDestinationsPage = async () => {
  let destinations: Destination[] = [];

  try {
    const res = await fetch("http://localhost:8000/destinations", {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        destinations = data;
      }
    }
  } catch (error) {
    console.error("Backend fetch error (falling back to curated mock destinations):", error);
  }

  return <DestinationsCatalog initialDestinations={destinations} />;
};

export default allDestinationsPage;