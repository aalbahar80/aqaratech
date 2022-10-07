import { createLogger, format, transports } from 'winston';
import { environment } from '$aqenvironment';

const { combine, colorize, json, timestamp, label, printf, splat } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
	level: environment.PUBLIC_AQ_DEBUG_LEVEL || 'info',
	format: combine(
		colorize(),
		splat(),
		json(),
		label({ label: 'site' }),
		timestamp(),
		myFormat,
		format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
	),
	transports: [new transports.Console()],
	exitOnError: false,
});

// example to print an object
// const myobj = { ... }
// logger.info('This message will include a complete object: %O', myobj);
