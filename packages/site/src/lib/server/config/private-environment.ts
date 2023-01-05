import { building } from '$app/environment';

import { envSchema } from '@self/utils';

import type { z } from 'zod';

import { env } from '$env/dynamic/private';

const schema = envSchema.pick({
	AUTH0_CLIENT_SECRET: true,
	LOGTAIL_TOKEN: true,
	ORIGIN: true,
});

type SiteEnvPrivateSchema = z.infer<typeof schema>;

export const privateEnvironment = building
	? (env as unknown as SiteEnvPrivateSchema)
	: schema.parse(env);
