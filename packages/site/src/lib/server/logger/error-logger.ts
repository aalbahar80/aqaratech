import { logger } from '$lib/server/logger';

export const errorLogger = (error: unknown) => {
	logger.error(error);
};
