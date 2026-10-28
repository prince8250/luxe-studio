import type { Metadata } from "next";
import Link from "next/link";

import { BrandButton } from "@/components/brand/brand-button";

export const metadata: Metadata = {
  title: "Book an appointment",
  description: "Online booking at Bestman Luxe Studio is coming soon.",
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-base px-5 pb-24 pt-32 text-on-dark sm:px-8 lg:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-sans text-4xl font-extrabold uppercase leading-tight tracking-[0.04em] sm:text-6xl">
          Book an appointment
        </h1>
        <p className="mt-5 text-lg text-muted-dark">
          Online booking is coming soon. Please check back to book your
          appointment.
        </p>
        <BrandButton asChild className="mt-8">
          <Link href="/services">Browse services</Link>
        </BrandButton>
      </div>
    </main>
  );
}
