import type { RequestHandler } from './$types';

import { MAX_AGE } from '$lib/constants/misc';

// eslint-disable-next-line @typescript-eslint/require-await
export const GET: RequestHandler = async ({ cookies, params, url }) => {
	cookies.set('role', params.id, {
		path: '/',
		maxAge: MAX_AGE,
	});

	const location = url.searchParams.get('redirectTo') ?? '/concierge';

	return new Response(undefined, {
		status: 302,
		headers: { location },
	});
};
