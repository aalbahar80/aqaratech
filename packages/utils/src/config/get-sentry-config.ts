import type { Options } from '@sentry/types';
import type { AqaratechEnv } from '../../../../types/environment';
import { isHealthCheck } from './is-health-check';
import { getReleaseName } from './sentry/release';
import { getSendEventConfig } from './sentry/should-send-events';

// TODO: use new typescript `satisfies` directive for return type
export const getSentryConfig = (config: Config): AqaratechSentryConfig => {
	const { PUBLIC_AQARATECH_ENV, PUBLIC_TRACE_RATE, PUBLIC_AQ_DEBUG_SENTRY } =
		config;

	const sampleRate = +(PUBLIC_TRACE_RATE ?? 0);
	const debug = PUBLIC_AQ_DEBUG_SENTRY === '1';

	// TODO: use new typescript `satisfies` directive for type instead of casting
	const sentryConfig: Options = {
		enabled: true,
		environment: PUBLIC_AQARATECH_ENV || 'unknown',
		debug,
		tracesSampleRate: sampleRate,
		release: getReleaseName(config),

		// Don't spam sentry with health checks
		tracesSampler(samplingContext) {
			if (isHealthCheck(samplingContext.transactionContext?.name)) {
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

export type Config = Pick<
	AqaratechEnv,
	'PUBLIC_AQARATECH_ENV' | 'PUBLIC_AQ_DEBUG_SENTRY' | 'PUBLIC_TRACE_RATE'
> & {
	/**
	 * The version from the package.json.
	 */
	version: string;
	commitSha: string | undefined;
	repoName: string;
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
