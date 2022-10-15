import { logger } from '$lib/server/logger';

export const errorLogger = (error: unknown) => {
	if (error instanceof Error) {
		logger.log({
			level: 'error',
			message: JSON.stringify({
				name: error.name,
				error: error.message,
				stack: error.stack,
				cause: error.cause,
			}),
		});
	}
};
