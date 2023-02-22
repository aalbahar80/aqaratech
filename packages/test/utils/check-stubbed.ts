import { apiURL } from '../tests/api/fixtures/api-url';

export const checkStubbed = async () => {
	const url = new URL('aq-config', apiURL);

	const res = await fetch(url);

	const data: unknown = await res.json();

	if (
		res.ok &&
		data &&
		typeof data === 'object' &&
		'PUBLIC_IS_TESTING' in data &&
		data.PUBLIC_IS_TESTING === true && // avoid running tests against non-stubbed services (myfatoorah)
		// @ts-expect-error test
		data.SENTRY_ENABLED === false // avoid running tests against live sentry
	) {
		return true;
	}
	return false;
};
