import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In | Wanderlust",
  description:
    "Sign in to your Wanderlust account to view and manage your trips and bookings.",
};

export default function LoginPage() {
  return <LoginForm />;
}
