import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ locals }) => {
	// This route is used:
	// 1. After a user logs in
	// 2. When a user clicks the "app" button in the navbar
	//
	// It should redirect the user to the correct page based on their role.

	let location: string;

	if (!locals.user) {
		// This should never happen, but just in case...
		throw new Error('User not found in locals');
	} else if (!locals.user.roles.length) {
		// if user has no roles yet, redirect to /welcome
		location = '/welcome';
	} else if (locals.user.role?.meta.home) {
		// if user has a role, redirect to their home page
		location = locals.user.role.meta.home;
	} else {
		// This should never happen, but just in case...
		throw new Error('User has no home page');
	}

	return new Response(undefined, {
		status: 302,
		headers: {
			location,
		},
	});
};
