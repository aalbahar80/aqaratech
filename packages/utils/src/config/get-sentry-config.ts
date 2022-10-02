import { Options } from '@sentry/types';
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
		tracesSampler(samplingContext) {
			if (samplingContext.transactionContext?.name?.startsWith('/health')) {
				return 0;
			}
			return sampleRate;
		},
	};
};

interface AqaratechConfig {
	PUBLIC_AQARATECH_ENV: string | undefined;
	PUBLIC_TRACE_RATE: string;
	PUBLIC_AQ_DEBUG_SENTRY: string;
}

type AqaratechSentryConfig = Pick<
	Options,
	'enabled' | 'environment' | 'debug' | 'tracesSampler'
>;
