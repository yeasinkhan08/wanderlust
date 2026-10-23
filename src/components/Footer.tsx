"use client"
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { ArrowUpRight } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/bookings" },
  { label: "My Profile", href: "/profile" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0c0b0b] text-white pt-16 md:pt-20 pb-10 px-6 md:px-12 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        {/* Brand & Tagline */}
        <div className="mb-14">
          <Link
            href="/"
            className={`${playfair.className} text-4xl sm:text-5xl font-bold tracking-tight text-white hover:text-white/90 transition-colors inline-block`}
          >
            Wanderlust
          </Link>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed font-normal">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          {/* Column 1: Newsletter */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-200 mb-2">
              Newsletter
            </h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed font-normal">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative flex items-center bg-[#252528] border border-gray-800"
            >
              <input
                type="email"
                placeholder="Enter email"
                className="bg-transparent px-3.5 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none w-full pr-10"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="absolute right-2.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-200 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-200 mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider uppercase text-gray-200 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-xs text-gray-400">
              <li>
                <a
                  href="tel:7869011622"
                  className="hover:text-white transition-colors"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="hover:text-white transition-colors"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="border-t border-[#1f1f23] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-normal">
            &copy; 2026 Wanderlust. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-gray-400">
            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-white transition-colors"
            >
              <svg
                className="h-4 w-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <svg
                className="h-4 w-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <svg
                className="h-4 w-4 fill-none stroke-current"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
