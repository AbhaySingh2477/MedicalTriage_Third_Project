import { config as dotenvConfig } from 'dotenv';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenvConfig({ path: resolve(__dirname, '../../../.env') });

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT_GATEWAY: z.coerce.number().default(4000),

  // Database
  DATABASE_URL: z.string(),

  // Redis
  REDIS_URL: z.string().default('redis://localhost:6379'),

  // Meilisearch
  MEILISEARCH_URL: z.string().default('http://localhost:7700'),
  MEILISEARCH_API_KEY: z.string().default(''),

  // JWT
  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  // AI Engine
  AI_ENGINE_URL: z.string().default('http://localhost:8000'),
  AI_CALLBACK_BASE_URL: z.string().default('http://localhost:4000'),

  // CORS
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const env = parsed.data;

export const config = {
  nodeEnv: env.NODE_ENV,
  isDev: env.NODE_ENV === 'development',
  port: env.PORT_GATEWAY,

  database: {
    url: env.DATABASE_URL,
  },

  redis: {
    url: env.REDIS_URL,
  },

  meilisearch: {
    url: env.MEILISEARCH_URL,
    apiKey: env.MEILISEARCH_API_KEY,
  },

  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
    accessExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
    refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
  },

  ai: {
    engineUrl: env.AI_ENGINE_URL,
    callbackBaseUrl: env.AI_CALLBACK_BASE_URL,
  },

  corsOrigins: env.CORS_ORIGINS.split(',').map((s) => s.trim()),
} as const;
