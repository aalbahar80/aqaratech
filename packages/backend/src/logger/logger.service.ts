import { LogtailTransport } from '@logtail/winston';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModuleOptionsFactory } from 'nest-winston';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { LogtailService } from 'src/logtail/logtail.service';
import { LoggerOptions } from 'winston';

@Injectable()
export class LoggerService implements WinstonModuleOptionsFactory {
	constructor(
		private readonly config: ConfigService<EnvironmentConfig, true>,
		private readonly logtailService: LogtailService,
	) {}

	createWinstonModuleOptions(): LoggerOptions | Promise<LoggerOptions> {
		const winstonConfig = this.config.get('winston', { infer: true });

		return {
			...winstonConfig,
			transports: [
				// @ts-expect-error remove after inferring config type
				...winstonConfig.transports,

				...(this.logtailService.logtail
					? [new LogtailTransport(this.logtailService.logtail)]
					: []),
			],
		};
	}
}
