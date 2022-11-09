import { Logtail } from '@logtail/node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { addEnvLabel, liveEnvs } from '@self/utils';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';

@Injectable()
export class LogtailService {
	constructor(readonly config: ConfigService<EnvironmentConfig, true>) {
		const env = config.get('PUBLIC_AQARATECH_ENV', { infer: true });

		const token = config.get('LOGTAIL_TOKEN', { infer: true });

		if (!liveEnvs.includes(env)) {
			console.log('Logtail is not initialized. Not a live environment.');
		} else if (!token) {
			console.log('Logtail is not initialized. No token provided.');
		} else {
			console.log('Logtail is initialized.');
			this.logtail = new Logtail(token);

			this.logtail.use(addEnvLabel(env));
		}
	}

	readonly logtail: Logtail | undefined;
}
