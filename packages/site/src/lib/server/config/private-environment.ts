import { building } from '$app/environment';

import { envSchema } from '@self/utils';

import { env } from '$env/dynamic/private';

const schema = envSchema.pick({
	AUTH0_CLIENT_SECRET: true,
	LOGTAIL_TOKEN: true,
	ORIGIN: true,
});

export const privateEnvironment = building ? env : schema.parse(env);
