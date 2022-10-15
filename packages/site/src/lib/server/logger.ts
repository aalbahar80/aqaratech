import { environment } from '$aqenvironment';
import { logtail } from '$lib/server/utils/logtail';
import { LogtailTransport } from '@logtail/winston';
import { createLogger, format, transports } from 'winston';

const { combine, colorize, json, timestamp, label, splat, prettyPrint } =
	format;

export const logger = createLogger({
	level: environment.PUBLIC_AQ_DEBUG_LEVEL || 'info',
	format: combine(timestamp(), json(), label({ label: 'site' })),
	transports: [
		new transports.Console({
			format: combine(
				prettyPrint(), // remove custom format
				colorize({ all: true }),
				splat(),
			),
		}),
		...(logtail ? [new LogtailTransport(logtail)] : []),
	],
});

// example to print an object
// const myobj = { ... }
// logger.info('This message will include a complete object: %O', myobj);

// Default logging levels:
// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// }
