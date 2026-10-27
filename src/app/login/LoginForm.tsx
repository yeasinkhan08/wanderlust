"use client";

import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const user = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const { data, error } = await authClient.signIn.email(user);

      if (error) {
        setErrorMessage(error.message || "Login failed. Please try again.");
        return;
      }

      if (data) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Design */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-36 left-1/2 h-[380px] w-[650px] -translate-x-1/2 rounded-full bg-gradient-to-b from-cyan-100/35 via-sky-50/15 to-transparent blur-3xl" />
      </div>

      <div className="relative w-full max-w-[440px]">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1
            className={`${playfair.className} text-3xl font-normal tracking-tight text-gray-900 sm:text-4xl`}
          >
            Welcome Back
          </h1>

          <p className="mt-2 text-sm font-normal text-gray-500">
            Sign in to continue your adventure with Wanderlust
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] sm:p-9">
          <form onSubmit={handleEmailLogIn}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-gray-800"
              >
                Email Address
              </label>

              <div className="relative flex items-center">
                <Mail className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-400" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-gray-200/90 bg-[#f8fafc] py-2.5 pl-10 pr-4 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-cyan-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600/15"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
              </div>

              <div className="relative flex items-center">
                <Lock className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-gray-200/90 bg-[#f8fafc] py-2.5 pl-10 pr-10 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-cyan-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600/15"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 transition-colors hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p
                role="alert"
                className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {errorMessage}
              </p>
            )}

            {/* Sign In Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-lg bg-[#0891b2] px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#0e7490] hover:shadow active:bg-[#155e75] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>

            <span className="relative bg-white px-3 text-xs font-normal text-gray-500">
              Or sign in with
            </span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={async () => {
              try {
                const { error } = await authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/",
                });

                if (error) {
                  setErrorMessage(error.message || "Google sign-in failed.");
                }
              } catch (error) {
                console.error("Google sign-in error:", error);
                setErrorMessage("Unable to sign in with Google.");
              }
            }}
            className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-xs transition-colors hover:border-gray-300 hover:bg-gray-50"
          >
            {/* Google Icon */}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43-.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            Sign In With Google
          </button>

          {/* Sign Up Link */}
          <p className="mt-7 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-cyan-600 transition-colors hover:text-cyan-700 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
