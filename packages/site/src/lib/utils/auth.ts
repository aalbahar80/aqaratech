export const protectRoute = (session: App.Session, pathname: string) => {
	// TODO create nonprotected 404 page
	const profileUrl = '/account/profile';
	const publicUrl = ['/', profileUrl].includes(pathname);

	let shouldRedirect = true;
	let redirectUrl = '/';

	if (publicUrl) {
		shouldRedirect = false;
	} else if (!publicUrl && !session.authz) {
		// Unauthenticated user
		shouldRedirect = true;
		redirectUrl = '/api/auth/login';
	} else if (!publicUrl && session.authz?.isTenant) {
		// Lost tenant
		shouldRedirect = !pathname.startsWith('/portal/tenant/');
		redirectUrl = `/portal/tenant/${session.authz.id}`;
	} else if (!publicUrl && session.authz?.isOwner) {
		// Lost owner
		shouldRedirect = !pathname.startsWith('/portal/owner/');
		redirectUrl = `/portal/owner/${session.authz.id}`;
	} else if (session.authz?.isAdmin) {
		// TODO either allow admin to access other routers or redirect them
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
