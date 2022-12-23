import { Logtail } from '@logtail/node';
import { Injectable } from '@nestjs/common';

import { addEnvLabel, isLiveEnv } from '@self/utils';

import { EnvService } from 'src/env/env.service';

@Injectable()
export class LogtailService {
	constructor(private readonly env: EnvService) {
		const envName = this.env.e.PUBLIC_AQARATECH_ENV;

		const token = this.env.e.LOGTAIL_TOKEN;

		if (!isLiveEnv(envName)) {
			console.log('Logtail is not initialized. Not a live environment.');
		} else if (!token) {
			console.log('Logtail is not initialized. No token provided.');
		} else {
			console.log('Logtail is initialized.');
			this.logtail = new Logtail(token);

			this.logtail.use(addEnvLabel(envName));
		}
	}

	readonly logtail: Logtail | undefined;
}
