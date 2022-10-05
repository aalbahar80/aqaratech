import { getSentryConfig } from '@self/utils';
import type { NodeOptions } from '@sentry/node';
import * as Sentry from '@sentry/node';
import { version } from '../../package.json';

const baseConfig = getSentryConfig({
	PUBLIC_AQ_DEBUG_SENTRY: process.env.PUBLIC_AQ_DEBUG_SENTRY,
	PUBLIC_AQARATECH_ENV: process.env.PUBLIC_AQARATECH_ENV,
	PUBLIC_TRACE_RATE: process.env.PUBLIC_TRACE_RATE,
});

export const sentryConfig: NodeOptions = {
	...baseConfig,
	dsn: 'https://c0020b9f9062452a826fcb956eb7f542@o1210217.ingest.sentry.io/6528733',
	release: `backend-${version}`,
	integrations: [
		// enable HTTP calls tracing
		new Sentry.Integrations.Http({
			tracing: true,
			// breadcrumbs: true,
		}),
	],
};
