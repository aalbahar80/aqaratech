import { f } from '$lib/config/colorLog';
import { logger } from '$lib/config/logger';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async (request) => {
	// TODO use env vars for url. dev/stage/prod
	const res = await fetch('https://hasura-xf70.onrender.com/v1/graphql', {
		headers: {
			// 'x-hasura-admin-secret': 'myadminsecret',
			Authorization: `Bearer ${request.locals.hasura}`,
		},
		method: request.method,
		body: request.rawBody,
	});
	logger.debug(f('graphql.ts', 13, { res }));
	const data = await res.json();
	return {
		status: res.status,
		body: data,
	};
};
