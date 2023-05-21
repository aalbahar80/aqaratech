import { z, type ZodTypeDef } from 'zod';

import { featureSchema } from './feature.schema';
import { isLiveEnv } from './live-envs';
import { zodEnvBooleanSchema } from './zod-env-boolean.schema';

import type { AqaratechEnv } from './aqaratech-env';

export const envSchema = z.object({
	PUBLIC_AQARATECH_ENV: z.enum(['development', 'staging', 'production']),

	PUBLIC_IS_TESTING: zodEnvBooleanSchema()
		.refine(
			(isTesting) => {
				const envName = process.env[
					'PUBLIC_AQARATECH_ENV'
				] as AqaratechEnv['PUBLIC_AQARATECH_ENV'];

				if (isTesting && isLiveEnv(envName)) {
					// testing is only allowed in development
					return false;
				} else {
					return true;
				}
			},
			{
				message:
					'Testing is only allowed in development. Set PUBLIC_AQARATECH_ENV to development',
			},
		)
		// @ts-expect-error - zod wrongly infers the type
		.default(false),

	// Sentry
	// @ts-expect-error - zod wrongly infers the type
	PUBLIC_AQ_ENABLE_SENTRY: zodEnvBooleanSchema().default(false),
	PUBLIC_TRACE_RATE: z.coerce.number().min(0).max(1).default(0),
	PUBLIC_COMMIT_SHA: z.string().optional(),

	// Debug
	PUBLIC_AQ_DEBUG_LEVEL: z
		.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'])
		.catch(() => {
			const defaultLevel = 'http' as const;
			console.log(
				`WARNING: Either the env var PUBLIC_AQ_DEBUG_LEVEL is not set or it is set to an invalid value. Defaulting to ${defaultLevel}`,
			);
			return defaultLevel;
		}),
	// @ts-expect-error - zod wrongly infers the type
	PUBLIC_AQ_DEBUG_SENTRY: zodEnvBooleanSchema().default(false),

	// @ts-expect-error - zod wrongly infers the type
	PAUSE_AUTO_INVOICE_REMINDERS: zodEnvBooleanSchema().default(false),

	// Stripe
	STRIPE_API_KEY: z.string(),
	// @ts-expect-error - zod wrongly infers the type
	STRIPE_PAUSE_USAGE_REPORTS: zodEnvBooleanSchema().default(false),
	STRIPE_USAGE_REPORT_CRON: z.string().optional(),
	PUBLIC_TIER_PLAN_ID_1: featureSchema,
	PUBLIC_TIER_PLAN_ID_2: featureSchema,
	// @ts-expect-error - zod wrongly infers the type
	PUBLIC_IS_PAYWALL_ACTIVE: zodEnvBooleanSchema().default(true),

	// Logtail
	LOGTAIL_TOKEN: z.string().optional(),

	// Myfatoorah
	MYFATOORAH_URL: z.string().url(),
	MYFATOORAH_KEY: z.string(),
	PUBLIC_MYFATOORAH_SITE_URL: z.string().url(),

	// Sveltekit adapter-node
	ORIGIN: z.string().url(),
	BODY_SIZE_LIMIT: z.coerce.number().min(0),

	// Site specific
	PUBLIC_SITE_URL: z.string().url(),
	PUBLIC_API_URL: z.string().url(),
	PUBLIC_API_URL_LOCAL: z.string().url(),
	AUTH0_CLIENT_SECRET: z.string(),

	// Backend specific
	DATABASE_URL: z.string(),

	// R2
	R2_ENDPOINT: z.string(),
	R2_ACCESS_KEY_ID: z.string(),
	R2_SECRET_ACCESS_KEY: z.string(),

	// Postmark
	POSTMARK_TOKEN: z.string(),

	// Novu
	NOVU_TOKEN: z.string(),

	// External
	CI: zodEnvBooleanSchema().optional(),
}) satisfies z.ZodType<AqaratechEnv, ZodTypeDef, unknown>;
