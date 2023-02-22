import { Injectable } from '@nestjs/common';
import * as R from 'remeda';

import { authConfig } from 'src/config/auth.config';
import { sentryConfig } from 'src/config/sentry.config';
import { winstonConfig } from 'src/config/winston.config';
import { BackendEnvSchema, backendEnvSchema } from 'src/env/env.schema';

@Injectable()
export class EnvService {
	readonly e: BackendEnvSchema;
	readonly auth: ReturnType<typeof authConfig>;
	readonly sentry: ReturnType<typeof sentryConfig>;
	readonly winston: typeof winstonConfig;

	constructor() {
		const parsed = backendEnvSchema.parse(process.env);

		this.e = parsed;
		this.auth = authConfig(parsed);
		this.sentry = sentryConfig(parsed);
		this.winston = winstonConfig;

		console.log(
			'EnvService',
			R.pick(this.e, [
				'PUBLIC_AQARATECH_ENV',
				'PUBLIC_AQ_DEBUG_LEVEL',
				'PUBLIC_IS_TESTING',
				'PUBLIC_SITE_URL',
				'R2_ENDPOINT',
				'BODY_SIZE_LIMIT',
				'STRIPE_PAUSE_USAGE_REPORTS',
			]),
		);

		console.log(
			'AuthConfig',
			R.pick(this.auth, [
				'AUTH0_DOMAIN',
				'AUTH0_API_AUDIENCE',
				'AUTH0_API_NAMESPACE',
			]),
		);

		console.log('SentryConfig', this.sentry);

		console.log('WinstonConfig', R.pick(this.winston, ['level']));
	}
}
