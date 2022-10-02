import { SamplingContext } from '@sentry/types';
import { shouldEnableSentry } from '../should-enable-sentry';

export const getSentryConfig = (
	config: AqaratechConfig,
): AqaratechSentryConfig => {
	const { PUBLIC_AQARATECH_ENV, PUBLIC_TRACE_RATE, PUBLIC_AQ_DEBUG_SENTRY } =
		config;
	return {
		enabled: shouldEnableSentry({
			env: PUBLIC_AQARATECH_ENV,
			debugEnv: PUBLIC_AQ_DEBUG_SENTRY,
		}),
		environment: PUBLIC_AQARATECH_ENV,
		debug: PUBLIC_AQ_DEBUG_SENTRY === '1',
		tracesSampler(samplingContext) {
			const sampleRate = +(PUBLIC_TRACE_RATE ?? 0);
			if (samplingContext.transactionContext?.name?.startsWith('/health')) {
				return 0;
			}
			return sampleRate;
		},
	};
};

interface AqaratechSentryConfig {
	enabled: boolean;
	environment: string;
	// TODO - should release include the package name?
	// release: string;
	debug: boolean;
	tracesSampler: (samplingContext: SamplingContext) => number;
}

interface AqaratechConfig {
	PUBLIC_AQARATECH_ENV: string;
	PUBLIC_TRACE_RATE: string;
	PUBLIC_AQ_DEBUG_SENTRY: string;
}
