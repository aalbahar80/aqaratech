import { env } from '$env/dynamic/private';
import { isProd } from '$lib/server/config/is-production';
import { z } from 'zod';

export const privateEnvironment = {
	AUTH0_CLIENT_SECRET: z.string().parse(env.AUTH0_CLIENT_SECRET),
	LOGTAIL_TOKEN: isProd
		? z.string().parse(env.LOGTAIL_TOKEN)
		: z.string().optional().parse(env.LOGTAIL_TOKEN),
};
