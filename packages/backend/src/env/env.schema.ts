import { z } from 'zod';

import { envSchema } from '@self/utils';

export const backendEnvSchema = envSchema.pick({
	PUBLIC_AQARATECH_ENV: true,
	PUBLIC_AQ_DEBUG_LEVEL: true,
	PUBLIC_IS_TESTING: true,
	LOGTAIL_TOKEN: true,

	DATABASE_URL: true,
	PUBLIC_SITE_URL: true,
	PUBLIC_API_URL: true,
	BODY_SIZE_LIMIT: true,

	// Stripe
	STRIPE_API_KEY: true,
	STRIPE_PAUSE_USAGE_REPORTS: true,
	STRIPE_USAGE_REPORT_CRON: true,
	PUBLIC_TIER_PLAN_ID_1: true,

	// R2
	R2_ENDPOINT: true,
	R2_ACCESS_KEY_ID: true,
	R2_SECRET_ACCESS_KEY: true,

	// Myfatoorah
	MYFATOORAH_KEY: true,
	MYFATOORAH_URL: true,

	PUBLIC_AQ_ENABLE_SENTRY: true,
	PUBLIC_AQ_DEBUG_SENTRY: true,
	PUBLIC_TRACE_RATE: true,
	PUBLIC_COMMIT_SHA: true,

	// Postmark
	POSTMARK_TOKEN: true,
});

export type BackendEnvSchema = z.infer<typeof backendEnvSchema>;
