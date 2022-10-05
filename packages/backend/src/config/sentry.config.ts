import { getSentryConfig } from '@self/utils';
import { version } from '../../package.json';

const baseConfig = getSentryConfig({
	PUBLIC_AQ_DEBUG_SENTRY: process.env.PUBLIC_AQ_DEBUG_SENTRY,
	PUBLIC_AQARATECH_ENV: process.env.PUBLIC_AQARATECH_ENV,
	PUBLIC_TRACE_RATE: process.env.PUBLIC_TRACE_RATE,
});

export const sentryConfig = {
	...baseConfig,
	dsn: 'https://c0020b9f9062452a826fcb956eb7f542@o1210217.ingest.sentry.io/6528733',
	release: `backend-${version}`,
};

type SentryConfig = typeof sentryConfig;
