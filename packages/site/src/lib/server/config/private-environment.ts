import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { isProd } from '$lib/server/config/is-production';
import { z } from 'zod';

const schema = z.object({
	AUTH0_CLIENT_SECRET: z.string(),
	LOGTAIL_TOKEN: isProd ? z.string() : z.string().optional(),
	ORIGIN: z.string().url(),
});

export const privateEnvironment = building ? env : schema.parse(env);
