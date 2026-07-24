import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, "Sanity Project ID is required"),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, "Sanity Dataset is required"),
});

// Validate environment variables at run/build time
const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
});

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables configuration:",
    parsed.error.flatten().fieldErrors
  );
  // Do not crash the app in development, but print warning
}

export const env = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uyxi3mds",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
};
export const projectId = env.projectId;
export const dataset = env.dataset;
