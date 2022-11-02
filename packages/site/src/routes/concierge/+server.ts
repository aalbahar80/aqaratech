import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ locals }) => {
	// This route is used:
	// 1. After a user logs in
	// 2. When a user clicks the "app" button in the navbar
	//
	// It should redirect the user to the correct page based on their role.

	let location: string;

	if (!locals.user?.roles.length) {
		// if user has no roles yet, redirect to /welcome
		location = '/welcome';
	} else if (locals.user?.role?.meta.home) {
		// if user has a role, redirect to their home page
		location = locals.user.role.meta.home;
	} else {
		// fallback to home page
		// TODO: monitor. this should never happen.
		location = '/';
	}

	return new Response(undefined, {
		status: 302,
		headers: {
			location,
		},
	});
};
