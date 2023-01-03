import type { RequestHandler } from './$types';

import { Cookie } from '@self/utils';

import { MAX_AGE, REDIRECT_TO } from '$lib/constants/misc';

// eslint-disable-next-line @typescript-eslint/require-await
export const GET: RequestHandler = async ({ cookies, params, url }) => {
	cookies.set(Cookie.role, params.id, {
		path: '/',
		maxAge: MAX_AGE,
	});

	const location = url.searchParams.get(REDIRECT_TO) ?? '/concierge';

	return new Response(undefined, {
		status: 302,
		headers: { location },
	});
};
