import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Environment variables — validated at runtime, not build time.
 *
 * During `next build`, Turbopack evaluates modules before env vars are loaded.
 * We always skip build-time validation to prevent "Invalid environment variables"
 * errors on Vercel. The actual env vars are available at runtime when API routes run.
 */
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    AUTH_SECRET: z.string().min(16),
    XAI_API_KEY: z.string().optional(),
    REGISTER_INVITE_CODE: z.string().optional(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },
  client: {
    NEXT_PUBLIC_INVITE_REQUIRED: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    XAI_API_KEY: process.env.XAI_API_KEY,
    REGISTER_INVITE_CODE: process.env.REGISTER_INVITE_CODE,
    NEXT_PUBLIC_INVITE_REQUIRED: process.env.NEXT_PUBLIC_INVITE_REQUIRED,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: true,
});
