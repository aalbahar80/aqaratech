import { isHealthCheck } from './is-health-check';
import { getReleaseName } from './sentry/release';
import { getSendEventConfig } from './sentry/should-send-events';

import type { Config } from './sentry/types';
import type { Options } from '@sentry/types';

// TODO: use new typescript `satisfies` directive for return type
/**
 * Events won't be sent in non-live environments unless `debug` is set to true and `sampleRate` is greater than 0.
 */
export const getSentryConfig = (config: Config): AqaratechSentryConfig => {
	const {
		PUBLIC_AQARATECH_ENV,
		PUBLIC_TRACE_RATE,
		PUBLIC_AQ_DEBUG_SENTRY,
		PUBLIC_AQ_ENABLE_SENTRY,
	} = config;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	const sampleRate = +(PUBLIC_TRACE_RATE ?? 0);
	const debug = PUBLIC_AQ_DEBUG_SENTRY === '1';

	// TODO: use new typescript `satisfies` directive for type instead of casting
	const sentryConfig: Options = {
		enabled: PUBLIC_AQ_ENABLE_SENTRY === '0' ? false : true,
		environment: PUBLIC_AQARATECH_ENV ?? 'unknown',
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

	return sentryConfig;
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
