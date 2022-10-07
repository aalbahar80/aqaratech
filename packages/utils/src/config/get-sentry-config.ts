import type { Options } from '@sentry/types';
import type { AqaratechEnv } from '../../../../types/environment';

// TODO: use new typescript `satisfies` directive for return type
export const getSentryConfig = (config: Config): AqaratechSentryConfig => {
	const { PUBLIC_AQARATECH_ENV, PUBLIC_TRACE_RATE, PUBLIC_AQ_DEBUG_SENTRY } =
		config;

	const sampleRate = +(PUBLIC_TRACE_RATE ?? 0);

	return {
		enabled: true,
		environment: PUBLIC_AQARATECH_ENV || 'unknown',
		debug: PUBLIC_AQ_DEBUG_SENTRY === '1',
		tracesSampleRate: sampleRate,

		// Don't spam sentry with health checks
		tracesSampler(samplingContext) {
			if (samplingContext.transactionContext?.name?.endsWith('/health')) {
				return 0;
			}
			return sampleRate;
		},

		// We don't want to send errors to Sentry in development/testing
		// We can't use `enabled: false` because that would disable sentry entirely,
		// which means that our tests would run without Sentry, causing a large discrepancy between production and testing.
		// TODO: consider not passing this option at all using conditional
		beforeSend(event) {
			const shouldSendEnvs: AqaratechEnv['PUBLIC_AQARATECH_ENV'][] = [
				'production',
				'staging',
			];
			if (shouldSendEnvs.includes(PUBLIC_AQARATECH_ENV)) {
				return event;
			} else {
				return null;
			}
		},
	};
};

type Config = Pick<
	AqaratechEnv,
	'PUBLIC_AQARATECH_ENV' | 'PUBLIC_AQ_DEBUG_SENTRY' | 'PUBLIC_TRACE_RATE'
>;

type AqaratechSentryConfig = Pick<
	Options,
	| 'enabled'
	| 'environment'
	| 'debug'
	| 'tracesSampler'
	| 'tracesSampleRate'
	| 'beforeSend'
>;
