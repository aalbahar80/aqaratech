import { z } from 'zod';

import { envSchema } from '@self/utils';

export const backendEnvSchema = envSchema.pick({
	PUBLIC_AQARATECH_ENV: true,
	PUBLIC_AQ_DEBUG_LEVEL: true,
	LOGTAIL_TOKEN: true,

	DATABASE_URL: true,
	AUTH0_CLIENT_SECRET: true,
	PUBLIC_SITE_URL: true,

	// R2
	R2_ACCOUNT_ID: true,
	R2_ACCESS_KEY_ID: true,
	R2_SECRET_ACCESS_KEY: true,

	// PUBLIC_AQ_ENABLE_SENTRY: true,
	// PUBLIC_TRACE_RATE: true,
	// PUBLIC_COMMIT_SHA: true,

	// Meilisearch
	MEILISEARCH_HOST: true,
	MEILISEARCH_API_KEY: true,

	// Postmark
	POSTMARK_TOKEN: true,
});

export type BackendEnvSchema = z.infer<typeof backendEnvSchema>;
