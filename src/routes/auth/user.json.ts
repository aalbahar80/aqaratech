import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = ({ locals }) => {
	return {
		body: {
			user: locals.user,
		},
	};
};
