import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/sections/hero";

export const metadata: Metadata = {
  title: "AutoForm - Instant forms for your schemas",
  description:
    "Automatically render usable forms from Zod, Yup, Joi, and other schemas.",
};

export default function Home() {
  return (
    <div className="landing-light min-h-screen w-full overflow-x-hidden bg-white text-zinc-950">
      <Navbar />
      <HeroSection />
    </div>
  );
}
