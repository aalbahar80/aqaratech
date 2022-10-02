import type { Options } from '@sentry/types';
import type { AqaratechConfig } from './aqaratech-config';
import { shouldEnableSentry } from './should-enable-sentry';

export const getSentryConfig = (
	config: AqaratechConfig,
): AqaratechSentryConfig => {
	const { PUBLIC_AQARATECH_ENV, PUBLIC_TRACE_RATE, PUBLIC_AQ_DEBUG_SENTRY } =
		config;

	const sampleRate = +(PUBLIC_TRACE_RATE ?? 0);

	return {
		enabled: shouldEnableSentry({
			PUBLIC_AQARATECH_ENV,
			PUBLIC_AQ_DEBUG_SENTRY,
		}),
		environment: PUBLIC_AQARATECH_ENV,
		debug: PUBLIC_AQ_DEBUG_SENTRY === '1',
		tracesSampleRate: sampleRate,
		tracesSampler(samplingContext) {
			if (samplingContext.transactionContext?.name?.startsWith('/health')) {
				return 0;
			}
			return sampleRate;
		},
	};
};

type AqaratechSentryConfig = Pick<
	Options,
	'enabled' | 'environment' | 'debug' | 'tracesSampler' | 'tracesSampleRate'
>;
