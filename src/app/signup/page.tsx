import type { Metadata } from "next";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Create Account | Wanderlust",
  description:
    "Start your adventure with Wanderlust. Create an account to discover breathtaking destinations and personalized travel experiences.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
