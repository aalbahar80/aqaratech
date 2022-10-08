import type { Options } from '@sentry/types';
import type { AqaratechEnv } from '../../../../types/environment';
import { isHealthCheck } from './is-health-check';
import { getReleaseName } from './sentry/release';

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

	if (!liveEnvs.includes(PUBLIC_AQARATECH_ENV) && !debug) {
		// Disable sending any events to Sentry in non-live environments.
		// If debugging Sentry, we still want to send events.
		//
		// We can't use `enabled: false` because that would disable sentry entirely,
		// which means that our tests would run without Sentry, causing a large discrepancy between production and testing.
		sentryConfig.beforeSend = () => {
			console.log('Sentry disabled in non-live environment', {
				PUBLIC_AQARATECH_ENV,
			});
			return null;
		};
	}

	return sentryConfig;
};

const liveEnvs: AqaratechEnv['PUBLIC_AQARATECH_ENV'][] = [
	'production',
	'staging',
];

export type Config = Pick<
	AqaratechEnv,
	| 'PUBLIC_AQARATECH_ENV'
	| 'PUBLIC_AQ_DEBUG_SENTRY'
	| 'PUBLIC_TRACE_RATE'
	| 'PUBLIC_COMMIT_SHA'
> & {
	/**
	 * The version from the package.json.
	 */
	version: string;
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
>;
