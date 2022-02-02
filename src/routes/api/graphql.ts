import { f } from '$lib/config/colorLog';
import { logger } from '$lib/config/logger';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async (event) => {
	// TODO use env vars for url. dev/stage/prod
	const res = await fetch('https://hasura-xf70.onrender.com/v1/graphql', {
		headers: {
			// 'x-hasura-admin-secret': 'myadminsecret',
			Authorization: `Bearer ${event.locals.hasura}`,
		},
		method: event.request.method,
		body: event.request.body,
	});
	logger.debug(f('graphql.ts', 13, { res }));

	const data = await res.json();
	return {
		status: res.status,
		body: data,
	};
};
