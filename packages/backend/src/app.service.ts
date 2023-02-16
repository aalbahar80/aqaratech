import { Injectable } from '@nestjs/common';

import { EnvService } from './env/env.service';

@Injectable()
export class AppService {
	constructor(private readonly env: EnvService) {}

	getConfig() {
		const { PUBLIC_AQARATECH_ENV } = this.env.e;
		return {
			PUBLIC_AQARATECH_ENV,
			SENTRY_ENABLED: this.env.sentry.enabled,
		};
	}

	async getMetrics() {
		// return this.prisma.c.$metrics.prometheus();
	}
}
