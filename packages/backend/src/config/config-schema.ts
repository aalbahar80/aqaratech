import { z } from 'zod';

export const schema = z.object({
	PUBLIC_AQARATECH_ENV: z.enum([
		'development',
		'testing',
		'staging',
		'production',
	]),

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

	LOGTAIL_TOKEN: z.string().optional(),
});
