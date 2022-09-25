import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// If idToken validation fails, we set both user and isAuthenticated to false
	// even though locals.user was populated using a valid accessToken.
	// TODO migrate recheck after migrate ok
	return {
		user: locals.isAuthenticated ? locals.user : undefined,
		accessToken: locals.accessToken ?? '',
		isAuthenticated: locals.isAuthenticated,
	};
};
