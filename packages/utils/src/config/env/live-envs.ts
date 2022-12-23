import type { AqaratechEnv } from './aqaratech-env';

/**
 * Environments where we should send events to Sentry, use Logtail, etc.
 */
const liveEnvs = [
	'production',
	'staging',
] satisfies AqaratechEnv['PUBLIC_AQARATECH_ENV'][];

export const isLiveEnv = (envName: AqaratechEnv['PUBLIC_AQARATECH_ENV']) =>
	liveEnvs.some((liveEnv) => liveEnv === envName);
