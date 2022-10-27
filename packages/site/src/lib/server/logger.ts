import { environment } from '$aqenvironment';
import { devConsoleFormat } from '$lib/server/utils/http-log-format';
import { logtail } from '$lib/server/utils/logtail';
import { LogtailTransport } from '@logtail/winston';
import { createLogger, format, transports } from 'winston';

const { combine, colorize, timestamp, label } = format;

export const logger = createLogger({
	level: environment.PUBLIC_AQ_DEBUG_LEVEL || 'info',
	format: combine(timestamp(), label({ label: 'site' })),
	transports: [
		// TODO: disable in production
		new transports.Console({
			level: 'http',
			format: combine(devConsoleFormat, colorize({ all: true })),
		}),
		...(logtail ? [new LogtailTransport(logtail)] : []),
	],
});

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
