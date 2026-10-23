import Link from "next/link";
import { UserRound } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left: primary links */}
        <ul className="flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-cyan-600 ${link.href === "/" ? "text-cyan-600" : "text-gray-800"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center: logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold tracking-tight text-cyan-600"
        >
          Wanderlust
        </Link>

        {/* Right: account links */}
        <div className="flex items-center gap-6">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-800 transition-colors hover:text-cyan-600"
          >
            <UserRound className="h-4 w-4" />
            Profile
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-800 transition-colors hover:text-cyan-600"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-gray-800 transition-colors hover:text-cyan-600"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
