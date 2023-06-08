import type { LoadEvent } from '@sveltejs/kit';

type Route = LoadEvent['route'];

export const HOME = '/[lang=lang]';

export const isHomeRoute = (route: Route) => route.id === HOME;

/** A flag to indicate whether the sidebar and hamburger menu should be
 * available on the page. Sidebar is always on landing page. */
export const isSidebarAvailable = (route: Route) => route.id !== HOME;

// ### Protected ###

const PROTECTED = [
	'/[lang=lang]/organizations',
	'/[lang=lang]/portal',
	'/[lang=lang]/users',
	'/[lang=lang]/welcome',
];

/** Routes that require authentication. Generally, all declared routes
 * except for the home page.
 *
 * Does not include server-side routes such as /auth/* or /health.
 *
 * Does not include unknown routes such as /does-not-exist. This is
 * important to avoid redirecting bots & crawlers to the login page. */
export const isProtectedRoute = (route: Route) => {
	const result = PROTECTED.some((r) => route.id?.startsWith(r));

	return result;
};

// ### Inactive ###

const INACTIVE = [
	'/[lang=lang]/organizations/[organizationId]/(settings)/billing',
	'/[lang=lang]/users/[id]/roles',
];

/** Returns true if the route is allowed while the user's organization is
 * inactive. */
export const isAllowedWhileInactive = (route: Route) => {
	if (!route.id) {
		return false;
	}

	return INACTIVE.includes(route.id);
};

// ### Role-less ###

const NO_ROLE = [
	'/[lang=lang]/users/[id]/roles',
	'/[lang=lang]/users/[id]/verify-phone',
	'/[lang=lang]/users/[id]/claim-roles',
	'/[lang=lang]/welcome',
	'/[lang=lang]/organizations/new',
];

export const isAllowedWhileNoRole = (route: Route) => {
	if (!route.id) {
		return false;
	}

	return NO_ROLE.includes(route.id);
};
