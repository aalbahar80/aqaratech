import { z, type ZodTypeDef } from 'zod';

import type { AqaratechEnv } from './aqaratech-env';

export const envSchema = z.object({
	PUBLIC_AQARATECH_ENV: z.enum([
		'development',
		'testing',
		'staging',
		'production',
	]),

	// Sentry
	PUBLIC_AQ_ENABLE_SENTRY: z.coerce.boolean(),
	PUBLIC_TRACE_RATE: z.coerce.number().min(0).max(1).default(0),
	PUBLIC_COMMIT_SHA: z.string().optional(),

	// Debug
	PUBLIC_AQ_DEBUG_LEVEL: z
		.enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
		.catch('info'),
	PUBLIC_AQ_DEBUG_SITE: z.coerce.boolean(),
	PUBLIC_AQ_DEBUG_SENTRY: z.coerce.boolean(),
	PUBLIC_AQ_DEBUG_PRISMA: z.coerce.boolean(),

	// Logtail
	LOGTAIL_TOKEN: z.string(),

	// Site specific
	ORIGIN: z.string().url(),
	PUBLIC_SITE_URL: z.string().url(),
	PUBLIC_API_URL: z.string().url(),
	PUBLIC_API_URL_LOCAL: z.string().url(),

	// Backend specific
	DATABASE_URL: z.string(),
	AUTH0_CLIENT_SECRET: z.string(),

	// R2
	R2_ACCOUNT_ID: z.string(),
	R2_ACCESS_KEY_ID: z.string(),
	R2_SECRET_ACCESS_KEY: z.string(),

	// Meilisearch
	MEILISEARCH_HOST: z.string(),
	MEILISEARCH_API_KEY: z.string(),

	// Postmark
	POSTMARK_TOKEN: z.string().optional(),

	// External
	CI: z.coerce.boolean().optional(),
}) satisfies z.ZodType<AqaratechEnv, ZodTypeDef, unknown>;
