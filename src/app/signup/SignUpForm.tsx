"use client";

import { useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Signup failed!");
        return;
      }

      window.location.href = "/login";
    } catch {
      setErrorMessage("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-gradient-to-b from-cyan-100/35 via-sky-50/15 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative w-full max-w-[440px]">
        <div className="text-center mb-8">
          <h1
            className={`${playfair.className} text-3xl sm:text-4xl font-normal tracking-tight text-gray-900`}
          >
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Start your adventure with Wanderlust
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] border border-gray-100 p-7 sm:p-9">
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-800 mb-1.5"
              >
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 h-4 w-4 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-lg bg-[#f8fafc] border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-900 focus:bg-white focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600/15"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-lg bg-[#f8fafc] border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-900 focus:bg-white focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600/15"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800 mb-1.5"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a password"
                  className="w-full rounded-lg bg-[#f8fafc] border border-gray-200 py-2.5 pl-10 pr-10 text-sm text-gray-900 focus:bg-white focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-800 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm your password"
                  className="w-full rounded-lg bg-[#f8fafc] border border-gray-200 py-2.5 pl-10 pr-10 text-sm text-gray-900 focus:bg-white focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600/15"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#0891b2] hover:bg-[#0e7490] text-white font-medium py-3 px-4 text-sm disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-cyan-600 hover:text-cyan-700 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
