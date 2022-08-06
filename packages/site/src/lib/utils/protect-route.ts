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
		console.log(
			`[PROTECT-ROUTE] Redirecting from ${pathname} to ${redirectUrl}`,
		);
		console.debug(session);
		return {
			redirect: redirectUrl,
			status: 302,
		};
	} else {
		return {};
	}
};
