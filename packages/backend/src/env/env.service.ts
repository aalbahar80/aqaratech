import { Injectable } from '@nestjs/common';
import * as R from 'remeda';

import { authConfig } from 'src/config/auth.config';
import { sentryConfig } from 'src/config/sentry.config';
import { winstonConfig } from 'src/config/winston.config';
import { backendEnvSchema } from 'src/env/env.schema';

@Injectable()
export class EnvService {
	readonly e = backendEnvSchema.parse(process.env);
	readonly auth = authConfig(backendEnvSchema.parse(process.env)); // TODO: dedupe schema parse
	readonly sentry = sentryConfig;
	readonly winston = winstonConfig;

	constructor() {
		console.log(
			'EnvService',
			R.pick(this.e, [
				'PUBLIC_AQARATECH_ENV',
				'PUBLIC_AQ_DEBUG_LEVEL',
				'PUBLIC_SITE_URL',
				'R2_ACCOUNT_ID',
				'MEILISEARCH_HOST',
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
