import { AqaratechConfig } from './aqaratech-config';

/**
 * Only run Sentry in production/staging, or when debugging it.
 */
export const shouldEnableSentry = ({
	PUBLIC_AQARATECH_ENV,
	PUBLIC_AQ_DEBUG_SENTRY,
}: Params) => {
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

type Params = Pick<
	AqaratechConfig,
	'PUBLIC_AQARATECH_ENV' | 'PUBLIC_AQ_DEBUG_SENTRY'
>;
