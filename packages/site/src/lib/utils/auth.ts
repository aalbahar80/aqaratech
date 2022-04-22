export const protectRoute = (session: App.Session, pathname: string) => {
	const profileUrl = '/account/profile';
	const publicUrl = ['/', profileUrl].includes(pathname);

	const contractUrl = /\/leases\/[a-f0-9-]+\/contract/;
	const newLeaseUrl = /^\/new\/leases/;
	const adminUrls = [contractUrl, newLeaseUrl];

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
		// TODO is needed if backend already checks for authz?
		shouldRedirect = adminUrls.some((url) => pathname.match(url));
	} else if (session.authz?.isAdmin) {
		shouldRedirect = false;
	}

	console.log({ shouldRedirect }, 'auth.ts ~ 28');
	if (shouldRedirect) {
		return {
			redirect: redirectUrl,
			status: 302,
		};
	} else {
		return {};
	}
};
