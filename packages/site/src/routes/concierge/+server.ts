import type { RequestHandler } from '@sveltejs/kit';

import { baseLocale } from '$i18n/i18n-util';

export const GET: RequestHandler = ({ locals: { user, locale } }) => {
	// This route is used:
	// 1. After a user logs in
	// 2. When a user clicks the "app" button in the navbar
	//
	// It should redirect the user to the correct page based on their role.

	let location: string;

	if (!user) {
		// This should never happen, but just in case...
		throw new Error('User not found in locals');
	} else if (!user.roles.length || !user.role) {
		// if user has no roles yet, redirect to /welcome
		location = `${locale ?? baseLocale}/welcome`;
	} else if (user.role.meta.home) {
		// if user has a role, redirect to their home page
		location = user.role.meta.home;
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
