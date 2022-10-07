/**
 * Convert winston log level to a nestjs log level.
 * TODO: Use typescript new `satisfies` directive here.
 */
export const logLevelMap = {
	error: 'error',
	warn: 'warn',
	info: 'log',
	http: 'log',
	verbose: 'verbose',
	debug: 'debug',
	silly: 'debug',
} as const;

/**
 * NestJS default logging levels.
 */
export const nestLogLevels = [
	'error',
	'warn',
	'log',
	'verbose',
	'debug',
] as const;
