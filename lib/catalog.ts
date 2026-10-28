import "server-only";

import type { Database } from "@/lib/database.types";
import { createPublicServerClient } from "@/lib/supabase/public-server";

type CategoryRow = Database["public"]["Tables"]["service_categories"]["Row"];
type ServiceRow = Database["public"]["Tables"]["services"]["Row"];

export interface CatalogCategory extends CategoryRow {
  services: CatalogService[];
  imageUrl: string | null;
}

export interface CatalogService extends ServiceRow {
  imageUrl: string | null;
}

export type CatalogResult =
  | { ok: true; categories: CatalogCategory[] }
  | { ok: false; error: string };

function getCatalogImageUrl(
  storage: ReturnType<ReturnType<typeof createPublicServerClient>["storage"]["from"]>,
  imagePath: string | null,
) {
  if (!imagePath) {
    return null;
  }

  const bucketRelativePath = imagePath.replace(/^catalog\//, "");
  return storage.getPublicUrl(bucketRelativePath).data.publicUrl;
}

export async function getActiveCatalog(): Promise<CatalogResult> {
  try {
    const supabase = createPublicServerClient();
    const [{ data: categories, error: categoriesError }, { data: services, error: servicesError }] =
      await Promise.all([
        supabase
          .from("service_categories")
          .select("*")
          .eq("active", true)
          .order("sort_order", { ascending: true })
          .order("name", { ascending: true }),
        supabase
          .from("services")
          .select("*")
          .eq("active", true)
          .order("name", { ascending: true }),
      ]);

    if (categoriesError || servicesError) {
      console.error("Unable to load the public service catalog.", {
        categoriesError,
        servicesError,
      });
      return { ok: false, error: "We could not load the services right now." };
    }

    const activeServices = services ?? [];
    const activeCategories = categories ?? [];
    const storage = supabase.storage.from("catalog");

    return {
      ok: true,
      categories: activeCategories.map((category) => ({
        ...category,
        services: activeServices.filter(
          (service) => service.category_id === category.id,
        ).map((service) => ({
          ...service,
          imageUrl: getCatalogImageUrl(storage, service.image_path),
        })),
        imageUrl: getCatalogImageUrl(storage, category.image_path),
      })),
    };
  } catch (error) {
    console.error("Unable to load the public service catalog.", error);
    return { ok: false, error: "We could not load the services right now." };
  }
}
