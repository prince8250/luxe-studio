import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";

function getPublicEnv(
  value: string | undefined,
  name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
) {
  if (!value) throw new Error(`${name} is required to create the Supabase browser client.`);
  return value;
}

export function createClient() {
  return createBrowserClient<Database>(
    getPublicEnv(process.env.NEXT_PUBLIC_SUPABASE_URL, "NEXT_PUBLIC_SUPABASE_URL"),
    getPublicEnv(
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    ),
  );
}
