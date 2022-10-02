/**
 * Only run Sentry in production/staging, or when debugging it.
 */
export const shouldEnableSentry = ({ env, debugEnv }: SentryOptions) => {
	if (debugEnv == '1') {
		return true;
	} else if (env === 'production' || env === 'staging') {
		return true;
	} else {
		return false;
	}
};

interface SentryOptions {
	env?: string | undefined;
	debugEnv?: string | undefined;
}
