import type { Middleware } from '@logtail/types';

/*
 * Middleware to add `environment` info to logtail logs.
 */
export const addEnvLabel = (environmentLabel: string): Middleware => {
	// eslint-disable-next-line @typescript-eslint/require-await
	return async (log) => {
		return {
			...log,
			environment: environmentLabel,
		};
	};
};
