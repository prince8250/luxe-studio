import { getActiveCatalog } from "@/lib/catalog";

import { ServicePanels } from "./service-panels";

export async function HomeServices() {
  const result = await getActiveCatalog();

  if (!result.ok) {
    return (
      <section id="services" className="bg-base px-5 py-24 text-center">
        <p role="alert" className="text-lg text-muted-dark">
          {result.error}
        </p>
      </section>
    );
  }

  return <ServicePanels categories={result.categories} />;
}

export function HomeServicesLoading() {
  return (
    <section
      id="services"
      className="grid gap-0 bg-base md:grid-cols-2 md:gap-2 md:px-2"
      aria-busy="true"
    >
      <div className="h-[31rem] animate-pulse bg-surface sm:h-[38rem] md:h-[44rem]" />
      <div className="hidden h-[44rem] animate-pulse bg-surface md:mt-28 md:block" />
    </section>
  );
}
