import { format, type LoggerOptions, transports } from 'winston';

export const winstonConfig = {
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
} satisfies LoggerOptions as LoggerOptions;
