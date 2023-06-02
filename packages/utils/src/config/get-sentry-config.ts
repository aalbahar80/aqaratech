import { isHealthCheck } from './is-health-check';
import { getReleaseName } from './sentry/release';
import { getSendEventConfig } from './sentry/should-send-events';

import type { Config } from './sentry/types';
import type { Options } from '@sentry/types';

/**
 * Events won't be sent in non-live environments unless `debug` is set to true and `sampleRate` is greater than 0.
 */
export const getSentryConfig = (config: Config) => {
	const {
		PUBLIC_AQARATECH_ENV,
		PUBLIC_TRACE_RATE,
		PUBLIC_AQ_DEBUG_SENTRY,
		PUBLIC_AQ_ENABLE_SENTRY,
	} = config;

	const sampleRate = PUBLIC_TRACE_RATE;
	const debug = PUBLIC_AQ_DEBUG_SENTRY;

	const sentryConfig: AqaratechSentryConfig = {
		enabled: PUBLIC_AQ_ENABLE_SENTRY,
		environment: PUBLIC_AQARATECH_ENV,
		debug,
		tracesSampleRate: sampleRate,
		release: getReleaseName(config),

		// Don't spam sentry with health checks
		tracesSampler(samplingContext) {
			if (isHealthCheck(samplingContext.transactionContext.name)) {
				return 0;
			}
			return sampleRate;
		},
	};

	// Suppress sending events in dev unless debugging
	const sendEventConfig = getSendEventConfig(config, { debug, sampleRate });

	if (!sendEventConfig.shouldAlwaysSend) {
		sentryConfig.beforeSend = sendEventConfig.beforeSend;
	}

	return sentryConfig satisfies AqaratechSentryConfig;
};

type AqaratechSentryConfig = Pick<
	Options,
	| 'enabled'
	| 'environment'
	| 'debug'
	| 'tracesSampler'
	| 'tracesSampleRate'
	| 'beforeSend'
	| 'release'
>;
