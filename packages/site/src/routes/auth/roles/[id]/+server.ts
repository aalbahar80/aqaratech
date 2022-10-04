import { MAX_AGE } from '$lib/constants/misc';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, params }) => {
	cookies.set('role', params.id, {
		path: '/',
		maxAge: MAX_AGE,
	});

	return new Response(undefined, {
		status: 302,
		headers: {
			location: '/concierge',
		},
	});
};
