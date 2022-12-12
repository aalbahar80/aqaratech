import { LogtailTransport } from '@logtail/winston';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	utilities as nestWinstonModuleUtilities,
	WinstonModuleOptionsFactory,
} from 'nest-winston';
import { format, LoggerOptions, transports } from 'winston';

import { httpLogFormat, ignoreHttp, onlyHttp } from '@self/utils';

import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { LogtailService } from 'src/logtail/logtail.service';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
	constructor(
		private readonly config: ConfigService<EnvironmentConfig, true>,
		private readonly logtailService: LogtailService,
	) {}

	createWinstonModuleOptions(): LoggerOptions | Promise<LoggerOptions> {
		// const winstonConfig = this.config.get('winston', { infer: true });

		const level = this.config.get('PUBLIC_AQ_DEBUG_LEVEL', { infer: true });

		const nestTransport = new transports.Console({
			format: format.combine(
				format(ignoreHttp)(),
				format.ms(),
				nestWinstonModuleUtilities.format.nestLike('backend', {
					prettyPrint: true, // explicitly setting this for pretty error logging
					colors: true,
				}),
			),
		});

		const transportForHttp = new transports.Console({
			level: 'http',
			format: format.combine(
				format(onlyHttp)(),
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				httpLogFormat(format.printf, 'backend'),
			),
		});

		return {
			// ...winstonConfig,

			// Common log formats for all transports
			format: format.combine(
				// https://github.com/winstonjs/logform#errors
				format.errors({ stack: true }),
				format.timestamp(),
				format.label({ label: 'backend' }),
			),

			level,
			transports: [
				transportForHttp,
				nestTransport,

				...(this.logtailService.logtail
					? [new LogtailTransport(this.logtailService.logtail)]
					: []),
			],
		};
	}
}
