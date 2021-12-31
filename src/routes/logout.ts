//  Logout endpoint

import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (req) => {
	//  Sets the user equal to null...
	req.locals.user = null;
	//  ...and redirect the request back to the home page
	return {
		status: 302,
		headers: {
			location: '/landing',
		},
	};
};
