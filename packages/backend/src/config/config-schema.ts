import { z } from 'zod';

export const schema = z.object({
	PUBLIC_AQARATECH_ENV: z.enum([
		'development',
		'testing',
		'staging',
		'production',
	]),
	LOGTAIL_TOKEN: z.string().optional(),
});
