import { environment } from '$aqenvironment';
import { logtail } from '$lib/server/utils/logtail';
import { LogtailTransport } from '@logtail/winston';
import { httpLogFormat, ignoreHttp, onlyHttp } from '@self/utils';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

export const logger = createLogger({
	level: environment.PUBLIC_AQ_DEBUG_LEVEL || 'info',
	format: combine(
		// https://github.com/winstonjs/logform#errors
		format.errors({ stack: true }),
		timestamp(),
		label({ label: 'site' }),
	),
	transports: [
		// Transport for HTTP logs
		// TODO: disable in production
		new transports.Console({
			level: 'http',
			format: combine(
				format(onlyHttp)(),
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				httpLogFormat(printf, 'site'),
			),
		}),

		// Transport for all other logs
		new transports.Console({
			format: combine(
				format(ignoreHttp)(),
				format.prettyPrint(),
				format.colorize({ all: true }),
			),
		}),

		// Transport for Logtail
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
