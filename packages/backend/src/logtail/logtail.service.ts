import { Logtail } from '@logtail/node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { addEnvLabel } from '@self/utils';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';

@Injectable()
export class LogtailService extends Logtail {
	constructor(readonly config: ConfigService<EnvironmentConfig>) {
		const token = config.get('LOGTAIL_TOKEN', { infer: true });

		const envLabel = config.get('PUBLIC_AQARATECH_ENV', { infer: true });

		// @ts-expect-error remove after validating env config
		super(token);

		// @ts-expect-error remove after validating env config
		this.use(addEnvLabel(envLabel));
	}
}
