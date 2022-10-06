import type { AqaratechEnv } from '../../../../types/environment';

/**
 * Only run Sentry in production/staging, or when debugging it.
 */
const shouldEnableSentry = ({
	PUBLIC_AQARATECH_ENV,
	PUBLIC_AQ_DEBUG_SENTRY,
}: Params) => {
	if (PUBLIC_AQ_DEBUG_SENTRY == '1') {
		console.log('Sentry is enabled because PUBLIC_AQ_DEBUG_SENTRY is set');
		return true;
	} else if (
		PUBLIC_AQARATECH_ENV === 'production' ||
		PUBLIC_AQARATECH_ENV === 'staging'
	) {
		console.log(
			'Sentry is enabled because PUBLIC_AQARATECH_ENV is set to',
			PUBLIC_AQARATECH_ENV,
		);
		return true;
	} else {
		console.log(
			'Sentry has been disabled based on the environment variables.',
			{
				PUBLIC_AQARATECH_ENV,
				PUBLIC_AQ_DEBUG_SENTRY,
			},
		);
		return false;
	}
};

type Params = Pick<
	AqaratechEnv,
	'PUBLIC_AQARATECH_ENV' | 'PUBLIC_AQ_DEBUG_SENTRY'
>;
