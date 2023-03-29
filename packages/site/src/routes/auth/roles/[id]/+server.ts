import type { RequestHandler } from './$types';
import { Cookie } from '@self/utils';

import { baseLocale } from '$i18n/i18n-util';
import { MAX_AGE, PREF_LOCALE, REDIRECT_TO } from '$lib/constants/misc';
import { COOKIE_OPTIONS } from '$lib/server/config/auth/cookie-options';

export const GET: RequestHandler = async ({
	cookies,
	params,
	url,
	locals: { locale },
	// eslint-disable-next-line @typescript-eslint/require-await
}) => {
	cookies.set(Cookie.role, params.id, {
		path: '/',
		maxAge: MAX_AGE,
		...COOKIE_OPTIONS,
	});

	const location =
		url.searchParams.get(REDIRECT_TO) ??
		`/concierge?${PREF_LOCALE}=${locale ?? baseLocale}`;

	return new Response(undefined, {
		status: 302,
		headers: { location },
	});
};
