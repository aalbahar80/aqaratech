/**
 * Only run Sentry in production/staging, or when debugging it.
 */
export const shouldEnableSentry = ({
	PUBLIC_AQARATECH_ENV,
	PUBLIC_AQ_DEBUG_SENTRY,
}: SentryOptions) => {
	if (PUBLIC_AQ_DEBUG_SENTRY == '1') {
		return true;
	} else if (
		PUBLIC_AQARATECH_ENV === 'production' ||
		PUBLIC_AQARATECH_ENV === 'staging'
	) {
		return true;
	} else {
		return false;
	}
};

interface SentryOptions {
	PUBLIC_AQARATECH_ENV: string | undefined;
	PUBLIC_AQ_DEBUG_SENTRY: string | undefined;
}
