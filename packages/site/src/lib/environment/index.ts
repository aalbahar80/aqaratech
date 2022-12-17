import { z } from 'zod';

import { browser, building } from '$app/environment';

import { env } from '$env/dynamic/public';

const envSchema = z.object({
	PUBLIC_AQARATECH_ENV: z.enum([
		'development',
		'testing',
		'staging',
		'production',
	]),

	PUBLIC_SITE_URL: z.string().url(),
	PUBLIC_API_URL: z.string().url(),
	PUBLIC_API_URL_LOCAL: z.string().url(),
	PUBLIC_AQ_ENABLE_SENTRY: z.string().default('0'),
	PUBLIC_AQ_DEBUG_SENTRY: z.string().default('0'),
	PUBLIC_TRACE_RATE: z.string().default('0'),
	PUBLIC_AQ_DEBUG_SITE: z.string().default('0'),
	PUBLIC_COMMIT_SHA: z.string().optional(),

	PUBLIC_AQ_DEBUG_LEVEL: z
		.enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
		.catch('debug'),
});

type EnvSchema = z.infer<typeof envSchema>;

// TODO use satisfies AqaratechEnv
/**
 * Validated public environment variables.
 * Avoid parsing in browser, else unexpected errors will be thrown.
 */
export const environment =
	building || browser ? (env as unknown as EnvSchema) : envSchema.parse(env);

if (!browser) {
	console.log({ environment });
}
