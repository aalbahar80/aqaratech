import { LOGIN } from '$lib/constants/routes';

export const protectRoute = (session: App.Session, pathname: string) => {
	const profileUrl = '/account/profile';
	const publicTrxUrl = '/p/transactions/';
	const publicUrl =
		['/', profileUrl].includes(pathname) || pathname.startsWith(publicTrxUrl);

	let shouldRedirect = true;
	let redirectUrl = '/';

	if (publicUrl) {
		shouldRedirect = false;
	} else if (!session.authz) {
		// Unauthenticated user
		shouldRedirect = true;
		redirectUrl = LOGIN;
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
