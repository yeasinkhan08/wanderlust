import { Playfair_Display } from "next/font/google";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#0c0b0b] py-24 md:py-32 lg:py-36">
      {/* High-res clean aerial airplane & tropical island background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/cta-airplane-bg.jpg')",
        }}
      />
      {/* Subtle cinematic vignette for optimal contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-95" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2
          className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-white drop-shadow`}
        >
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-sm sm:text-base text-white/90 font-normal max-w-xl mx-auto drop-shadow-sm">
          Join thousands of travelers who have discovered the world with us
        </p>

        <div className="mt-7 sm:mt-8 flex justify-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2.5 bg-white px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0c0b0b] transition-all hover:bg-gray-100 hover:shadow-xl cursor-pointer shadow-lg transform hover:-translate-y-0.5"
          >
            <span>BOOK YOUR TRIP TODAY</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
