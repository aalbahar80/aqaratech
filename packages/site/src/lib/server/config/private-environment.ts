import { env } from '$env/dynamic/private';
import { isProd } from '$lib/server/config/is-production';
import { z } from 'zod';

const schema = z.object({
	AUTH0_CLIENT_SECRET: z.string(),
	LOGTAIL_TOKEN: isProd ? z.string() : z.string().optional(),
});

export const privateEnvironment = schema.parse(env);
