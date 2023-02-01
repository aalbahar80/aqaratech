import { apiURL } from '../tests/api/fixtures/api-url';

export const checkStubbed = async () => {
	const url = new URL('aq-config', apiURL);

	const res = await fetch(url);

	const data: unknown = await res.json();

	if (
		res.ok &&
		data &&
		typeof data === 'object' &&
		'PUBLIC_AQARATECH_ENV' in data &&
		data.PUBLIC_AQARATECH_ENV === 'testing' && // avoid running tests against non-stubbed services (myfatoorah)
		// @ts-expect-error test
		data.SENTRY_ENABLED === false // avoid running tests against live sentry
	) {
		return true;
	}
	return false;
};
