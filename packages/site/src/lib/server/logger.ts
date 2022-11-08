import { environment } from '$aqenvironment';
import { logtail } from '$lib/server/utils/logtail';
import { LogtailTransport } from '@logtail/winston';
import { httpLogFormat, ignoreHttp, onlyHttp } from '@self/utils';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

export const logger = createLogger({
	level: environment.PUBLIC_AQ_DEBUG_LEVEL || 'info',
	format: combine(timestamp(), label({ label: 'site' })),
	transports: [
		// TODO: disable in production
		new transports.Console({
			level: 'http',
			format: combine(
				format(onlyHttp)(),
				timestamp(),
				label({ label: 'site' }),
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				httpLogFormat(printf, 'site'),
			),
		}),

		new transports.Console({
			format: combine(
				format(ignoreHttp)(),
				format.json(),
				format.prettyPrint(),
				format.splat(),
				format.colorize({ all: true }),
			),
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
