import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return {
		status: 200,
		body: {
			status: 'OK',
		},
	};
};
