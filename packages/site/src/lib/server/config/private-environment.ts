import { building } from '$app/environment';
import { envSchema } from '@self/utils';

import type { z } from 'zod';

import { env } from '$env/dynamic/private';

const schema = envSchema.pick({
	AUTH0_CLIENT_SECRET: true,
	STRIPE_API_KEY: true,
	LOGTAIL_TOKEN: true,
	ORIGIN: true,

	// We validate BODY_SIZE_LIMIT here to get notified if it is missing. We
	// don't actually use it throughout the site app, only as a flag to the
	// node process.
	BODY_SIZE_LIMIT: true,
});

type SiteEnvPrivateSchema = z.infer<typeof schema>;

export const privateEnvironment = building
	? (env as unknown as SiteEnvPrivateSchema)
	: schema.parse(env);
