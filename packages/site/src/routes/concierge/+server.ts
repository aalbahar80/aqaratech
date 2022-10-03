import { authConfig } from '$lib/environment/auth';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	// This route is used:
	// 1. After a user logs in
	// 2. When a user clicks the "app" button in the navbar
	//
	// It should redirect the user to the correct page based on their role.
	//
	console.log('TODO: implement /concierge redirect');
	debugger;

	return new Response(undefined, {
		status: 302,
		headers: {
			location: '/',
		},
	});
};
