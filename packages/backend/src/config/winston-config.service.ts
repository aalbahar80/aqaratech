import { LogtailTransport } from '@logtail/winston';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	utilities as nestWinstonModuleUtilities,
	WinstonModuleOptionsFactory,
} from 'nest-winston';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { LogtailService } from 'src/logtail/logtail.service';
import { format, LoggerOptions, transports } from 'winston';

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
				format.timestamp(),
				format.ms(),
				nestWinstonModuleUtilities.format.nestLike('backend', {
					prettyPrint: true, // explicitly setting this for pretty error logging
					colors: true,
				}),
			),
		});

		return {
			// ...winstonConfig,
			level,
			transports: [
				nestTransport,

				...(this.logtailService.logtail
					? [new LogtailTransport(this.logtailService.logtail)]
					: []),
			],
		};
	}
}
