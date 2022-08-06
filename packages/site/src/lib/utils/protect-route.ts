import { LOGIN } from '$lib/constants/routes';

export const protectRoute = (session: App.Session, pathname: string) => {
	// const welcome = '/welcome';
	const publicUrl = ['/'].includes(pathname);

	let shouldRedirect = true;
	let redirectUrl = '/';

	if (publicUrl) {
		shouldRedirect = false;
	} else if (!session.isAuthenticated) {
		// Unauthenticated user
		shouldRedirect = true;
		redirectUrl = LOGIN;
	} else {
		// Authenticated user
		shouldRedirect = false;
	}

	if (shouldRedirect) {
		return {
			redirect: redirectUrl,
			status: 302,
		};
	} else {
		return {};
	}
};
