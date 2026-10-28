import { Suspense } from "react";
import type { Metadata } from "next";

import { ServicesCatalog } from "@/components/public/services-catalog";
import { getActiveCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the services available at Bestman Luxe Studio.",
};

async function ServicesContent() {
  const result = await getActiveCatalog();

  if (!result.ok) {
    return (
      <p role="alert" className="border border-error bg-surface px-5 py-10 text-center text-lg">
        {result.error}
      </p>
    );
  }

  return <ServicesCatalog categories={result.categories} />;
}

function ServicesLoading() {
  return (
    <div className="space-y-4" aria-busy="true">
      <div className="h-20 animate-pulse bg-surface" />
      <div className="h-40 animate-pulse bg-surface" />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-base px-5 pb-24 pt-32 text-on-dark sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 max-w-2xl">
          <p className="font-condensed text-sm uppercase tracking-[0.2em] text-muted-dark">
            Bestman Luxe Studio
          </p>
          <h1 className="mt-3 font-sans text-5xl font-extrabold uppercase leading-tight tracking-[0.04em] sm:text-7xl">
            Services
          </h1>
          <p className="mt-5 text-lg text-muted-dark">
            Considered beauty and grooming services, delivered with precision.
          </p>
        </header>
        <Suspense fallback={<ServicesLoading />}>
          <ServicesContent />
        </Suspense>
      </div>
    </main>
  );
}
