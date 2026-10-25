import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1, "NEXT_PUBLIC_SUPABASE_URL is required."),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is required."),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required."),
  NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: z.string().min(1, "NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is required."),
  PAYSTACK_SECRET_KEY: z.string().min(1, "PAYSTACK_SECRET_KEY is required."),
  SMS_PROVIDER_KEY: z.string().min(1, "SMS_PROVIDER_KEY is required."),
  SMS_SENDER_ID: z.string().min(1, "SMS_SENDER_ID is required."),
  SITE_URL: z.string().min(1, "SITE_URL is required."),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const missing = parsedEnv.error.issues
    .map((issue) => issue.path.join(".") || issue.message)
    .join("\n");

  throw new Error(`Missing required environment variables:\n${missing}`);
}

export const env = parsedEnv.data;
export default env;
