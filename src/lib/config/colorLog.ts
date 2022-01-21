import { browser } from '$app/env';
import { logger } from './logger';
// import colorize from '@pinojs/json-colorizer';

/**
 * Custom log helper for use in development.
 * Enhances log with color.
 */
export const f = async (file: string, line: number, object: any) => {
	const loc = `${file} ~ ${line}`;
	logger.debug({ loc }, 'trying to colorize');
	if (browser) {
		return loc;
	} else {
		let colorize;
		colorize = await import('@pinojs/json-colorizer');
		return colorize.default({ loc, object }, { pretty: true });
	}
};
