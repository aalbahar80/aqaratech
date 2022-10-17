import { format, LoggerOptions, transports } from 'winston';

// TODO: use satisfies operator
export const winstonConfig: LoggerOptions = {
	level: process.env.PUBLIC_AQ_DEBUG_LEVEL ?? 'info',
	format: format.combine(
		format.timestamp(),
		format.json(),
		format.label({ label: 'backend' }),
	),
	transports: [
		new transports.Console({
			format: format.combine(
				format.prettyPrint(), // remove custom format
				format.colorize({ all: true }),
				format.splat(),
			),
		}),
	],
};
