import Image from "next/image";
import Link from "next/link";

import type { CatalogCategory } from "@/lib/catalog";
import { formatGhs } from "@/lib/money";

interface ServicesCatalogProps {
  categories: CatalogCategory[];
}

export function ServicesCatalog({ categories }: ServicesCatalogProps) {
  if (categories.length === 0) {
    return (
      <p className="border border-line bg-surface px-5 py-10 text-center text-lg text-muted-dark">
        No services are available at the moment. Please check back soon.
      </p>
    );
  }

  return (
    <div className="space-y-20">
      {categories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="scroll-mt-24"
          aria-labelledby={`${category.id}-title`}
        >
          <div className="mb-7 border-b border-line pb-4">
            <h2
              id={`${category.id}-title`}
              className="font-sans text-4xl font-extrabold uppercase tracking-[0.04em] sm:text-5xl"
            >
              {category.name}
            </h2>
            {category.tagline ? (
              <p className="mt-2 text-lg text-muted-dark">{category.tagline}</p>
            ) : null}
          </div>

          {category.services.length === 0 ? (
            <p className="text-lg text-muted-dark">More services coming soon.</p>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {category.services.map((service) => {
                const imageUrl = service.imageUrl ?? category.imageUrl;

                return (
                  <article
                    key={service.id}
                    className="grid min-h-40 grid-cols-[7rem_1fr] border border-line bg-surface sm:grid-cols-[9rem_1fr]"
                  >
                    <div className="relative min-h-40 bg-bar">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt=""
                          fill
                          sizes="144px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col justify-between gap-5 p-4 sm:p-5">
                      <div>
                        <h3 className="font-sans text-2xl font-bold uppercase tracking-[0.03em]">
                          {service.name}
                        </h3>
                        {service.description ? (
                          <p className="mt-2 text-base text-muted-dark">{service.description}</p>
                        ) : null}
                      </div>
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <p className="font-condensed text-2xl tracking-[0.08em]">
                            {formatGhs(service.price)}
                          </p>
                          <p className="font-condensed text-sm uppercase tracking-[0.12em] text-muted-dark">
                            {service.duration_minutes} min
                          </p>
                          {service.payment_mode === "deposit" ? (
                            <p className="mt-1 text-sm text-muted-dark">
                              Deposit required: {formatGhs(service.deposit_amount)}
                            </p>
                          ) : null}
                        </div>
                        <Link
                          href={`/book?service=${service.id}`}
                          className="inline-flex min-h-11 items-center justify-center border-2 border-border-button bg-button px-5 font-condensed text-sm font-semibold uppercase tracking-[0.15em] transition-colors hover:border-border-strong hover:bg-surface"
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
