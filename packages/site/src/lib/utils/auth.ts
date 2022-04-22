export const protectRoute = (session: App.Session, pathname: string) => {
	const profileUrl = '/account/profile';
	const publicUrl = ['/', profileUrl].includes(pathname);

	let shouldRedirect = true;
	let redirectUrl = '/';

	if (publicUrl) {
		shouldRedirect = false;
	} else if (!session.authz) {
		// Unauthenticated user
		shouldRedirect = true;
		redirectUrl = '/api/auth/login';
	} else if (session.authz?.isTenant) {
		// Lost tenant
		shouldRedirect = !pathname.startsWith('/portal/tenant/');
		redirectUrl = `/portal/tenant/${session.authz.id}`;
	} else if (session.authz?.isOwner) {
		shouldRedirect = false;
	} else if (session.authz?.isAdmin) {
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
