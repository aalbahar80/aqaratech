import '@sentry/tracing';

import { environment } from '$aqenvironment';
import { sentryConfig } from '$lib/environment/sentry.config';
import { privateEnvironment } from '$lib/server/config/private-environment';
import { logger } from '$lib/server/logger';

/** Log config values, typically called at startup */
export const logConfig = () => {
	logger.log({
		level: 'info',
		message: JSON.stringify({
			name: 'AqaratechConfig',
			AQARATECH_APP_VERSION: __AQARATECH_APP_VERSION__,
			ORIGIN: privateEnvironment.ORIGIN,
			BODY_SIZE_LIMIT: privateEnvironment.BODY_SIZE_LIMIT,
			...environment,
		}),
	});

	logger.log({
		level: 'info',
		message: JSON.stringify({
			name: 'SentryConfig',
			...sentryConfig,
		}),
	});
};
