import type { AqaratechEnv } from '../../../../../types/environment';

/**
 * Environments where we should send events to Sentry, use Logtail, etc.
 */
export const liveEnvs = [
	'production',
	'staging',
] satisfies AqaratechEnv['PUBLIC_AQARATECH_ENV'][];
