import { Playfair_Display } from "next/font/google";
import { ShieldCheck, Map, Headset } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#edfcff] py-16 md:py-24 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-14">
          <h2
            className={`${playfair.className} text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[#0c0b0b]`}
          >
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#606567] font-normal max-w-xl mx-auto">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white p-8 sm:p-9 lg:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-300 text-left flex flex-col justify-start"
              >
                <div className="text-[#15a1bf] mb-6">
                  <Icon className="h-9 w-9" strokeWidth={2} />
                </div>
                <h3 className="text-xl sm:text-[22px] font-normal text-[#0c0b0b] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#606567] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
