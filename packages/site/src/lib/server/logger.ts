import { createLogger, format, transports } from 'winston';

const { combine, colorize, json, timestamp, label, printf, splat } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
	level: 'debug',
	format: combine(
		colorize(),
		splat(),
		json(),
		label({ label: 'site' }),
		timestamp(),
		myFormat,
	),
	transports: [new transports.Console()],
});
