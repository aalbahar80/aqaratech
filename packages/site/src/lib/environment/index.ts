import { browser, building } from '$app/environment';
import { env } from '$env/dynamic/public';
import { z } from 'zod';

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

	// validate debug level, if validation fails, set it to verbose
	PUBLIC_AQ_DEBUG_LEVEL: z
		.enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
		.optional()
		.transform((value) => {
			if (value === undefined) {
				console.log(
					'PUBLIC_AQ_DEBUG_LEVEL is undefined or has failed validation, setting to verbose',
				);
				return 'verbose';
			} else {
				return value;
			}
		}),
});

type EnvSchema = z.infer<typeof envSchema>;

// TODO use satisfies AqaratechEnv
/**
 * Validated public environment variables.
 */
export const environment = building
	? (env as unknown as EnvSchema)
	: envSchema.parse(env);

if (!browser) {
	console.log({ environment });
}
