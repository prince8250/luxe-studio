import Image from "next/image";
import Link from "next/link";

import type { CatalogCategory } from "@/lib/catalog";

interface ServicePanelsProps {
  categories: CatalogCategory[];
}

export function ServicePanels({ categories }: ServicePanelsProps) {
  if (categories.length === 0) {
    return (
      <section id="services" className="bg-base px-0 py-20 text-center sm:py-28">
        <p className="px-5 text-lg text-muted-dark">
          Services are being refreshed. Please check back soon.
        </p>
      </section>
    );
  }

  return (
    <section id="services" className="bg-base" aria-labelledby="services-title">
      <h2 id="services-title" className="sr-only">
        Services
      </h2>
      <div className="grid gap-0 md:grid-cols-2 md:gap-2 md:px-2">
        {categories.map((category, index) => (
          <article
            key={category.id}
            className={`group relative isolate flex min-h-[31rem] items-center justify-center overflow-hidden bg-surface sm:min-h-[38rem] ${
              index % 2 === 1
                ? "md:mt-28 md:min-h-[44rem]"
                : "md:min-h-[44rem]"
            }`}
          >
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
            ) : null}
            <div className="absolute inset-0 bg-black/50 transition-colors duration-500 group-hover:bg-black/60" />
            <div className="relative z-10 flex max-w-[90%] flex-col items-center px-5 text-center text-on-dark">
              <h3 className="font-sans text-4xl font-extrabold uppercase tracking-[0.04em] sm:text-5xl">
                {category.name}
              </h3>
              <p className="mt-3 text-lg">{category.tagline ?? "Services, finished beautifully."}</p>
              <Link
                href={`/services#${category.id}`}
                className="mt-7 inline-flex min-h-11 items-center border border-border-strong px-7 font-condensed text-base font-semibold uppercase tracking-[0.15em] !text-on-dark transition-colors hover:bg-border-strong hover:text-base"
              >
                See more
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
