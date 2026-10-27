"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Admin", href: "/admin" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left: Primary links */}
        <ul className="flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-cyan-600 ${
                  link.href === "/" ? "text-cyan-600" : "text-gray-800"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center: Logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold tracking-tight text-cyan-600"
        >
          Wanderlust
        </Link>

        {/* Right: Account links */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-1.5 text-sm font-medium text-gray-800 transition-colors hover:text-cyan-600"
              >
                <UserRound className="h-4 w-4" />
                Profile
              </Link>

              <Popover>
                <PopoverTrigger
                  render={
                    <button
                      type="button"
                      aria-label="Open user menu"
                      className="rounded-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-cyan-600"
                    />
                  }
                >
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image ?? undefined}
                      alt={user.name ?? "User"}
                    />
                    <AvatarFallback>
                      {user.name?.charAt(0).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-64" align="end">
                  <PopoverHeader>
                    <PopoverTitle>{user.name}</PopoverTitle>

                    <PopoverDescription>{user.email}</PopoverDescription>
                  </PopoverHeader>

                  <div className="mt-3 border-t border-gray-200 pt-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
