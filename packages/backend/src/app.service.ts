import { Injectable } from '@nestjs/common';

import { EnvService } from './env/env.service';

@Injectable()
export class AppService {
	constructor(private readonly env: EnvService) {}

	getConfig() {
		const { PUBLIC_AQARATECH_ENV, PUBLIC_IS_TESTING } = this.env.e;
		return {
			PUBLIC_AQARATECH_ENV,
			PUBLIC_IS_TESTING,
			SENTRY_ENABLED: this.env.sentry.enabled, // return false if nothing will be sent to sentry (shouldAlwaysSend is false)
		};
	}

	async getMetrics() {
		// return this.prisma.c.$metrics.prometheus();
	}
}
