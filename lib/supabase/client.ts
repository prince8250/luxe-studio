import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";

function getPublicEnv(
  name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  value: string | undefined,
) {
  if (!value) throw new Error(`${name} is required to create the Supabase browser client.`);
  return value;
}

export function createClient() {
  return createBrowserClient<Database>(
    getPublicEnv("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    getPublicEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
  );
}
