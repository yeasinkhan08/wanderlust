"use client";

import * as React from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/testimonials/michael-chen.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/testimonials/sarah-johnson.png",
  },
  {
    quote:
      '"Exploring Japan with Wanderlust was the best decision we made. From the tranquil temples of Kyoto to the bustling streets of Tokyo, everything was seamless."',
    name: "David Miller",
    location: "London, UK",
    image: "/testimonials/david-miller.jpg",
  },
  {
    quote:
      '"The Safari in Kenya blew us away. We saw the Big Five on day two! The accommodations were phenomenal and the team took care of every single detail."',
    name: "Elena Rostova",
    location: "Sydney, Australia",
    image: "/testimonials/elena-rostova.jpg",
  },
];

export default function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          {/* Section Header with Title and Carousel Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h2
                className={`${playfair.className} text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#0c0b0b]`}
              >
                What Travelers Say
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#606567] font-normal">
                Real experiences from our happy travelers
              </p>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 disabled:opacity-35 disabled:hover:border-gray-300 disabled:hover:text-gray-600 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 disabled:opacity-35 disabled:hover:border-gray-300 disabled:hover:text-gray-600 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {/* Testimonial Cards Slider */}
          <CarouselContent className="-ml-6">
            {testimonials.map((item, index) => (
              <CarouselItem
                key={`${item.name}-${index}`}
                className="pl-6 basis-full md:basis-1/2"
              >
                <div className="bg-white border border-gray-100 shadow-[0_2px_14px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-300 p-7 sm:p-8 flex flex-col sm:flex-row justify-between items-stretch gap-6 h-full">
                  {/* Left Column: Quote & Author info */}
                  <div className="flex flex-col justify-between flex-1">
                    <p className="text-sm sm:text-[15px] font-normal text-[#1a1a1a] leading-relaxed">
                      {item.quote}
                    </p>

                    <div className="mt-8 pt-2">
                      <p className="text-sm sm:text-[15px] font-medium text-[#15a1bf]">
                        <span className="mr-1.5">—</span>
                        {item.name}
                      </p>
                      <p className="text-xs text-[#71717a] mt-0.5 ml-4">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Traveler Photo */}
                  <div className="relative w-full sm:w-36 md:w-40 lg:w-44 h-48 sm:h-auto shrink-0 overflow-hidden bg-gray-100 self-center sm:self-stretch">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={200}
                      height={240}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
