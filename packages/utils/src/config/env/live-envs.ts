import type { AqaratechEnv } from '../../../../../types/environment';

/**
 * Environments where we should send events to Sentry, use Logtail, etc.
 */
export const liveEnvs: AqaratechEnv['PUBLIC_AQARATECH_ENV'][] = [
	'production',
	'staging',
];
