import { error, redirect } from '@sveltejs/kit';
import { withQuery } from 'ufo';

import { getRoute, PageTab } from '@self/utils';

import type { LoadEvent } from '@sveltejs/kit';

import { DESTINATION } from '$lib/constants/misc';
import { LOGIN } from '$lib/constants/routes';
import { environment } from '$lib/environment';
import {
	isAllowedWhileInactive,
	isAllowedWhileNoRole,
	isProtectedRoute,
} from '$lib/utils/route-utils';

export const handleRedirect = ({
	user,
	route,
	pathname,
}: {
	user: App.Locals['user'];
	route: LoadEvent['route'];
	pathname: string;
}) => {
	const isProtected = isProtectedRoute(route);

	// Public routes

	if (!isProtected) {
		return;
	}

	// All users

	// Checking for data.user and redirecting here causes this function to catch
	// all the random requests by bots and crawlers that are not logged in.
	// If this becomes a problem, we can move this function one level deeper,
	// letting all random requests fall through to the 404 page instead of
	// redirecting them to the auth0 login page.
	if (!user) {
		// preserve the current destination in the query string,
		// so we can redirect back after login

		const location = withQuery(LOGIN, { [DESTINATION]: pathname });

		throw redirect(302, location);
	}

	// Users with a role

	if (isAllowedWhileNoRole(route)) {
		return;
	} else if (!user.role) {
		throw error(403);
	}

	if (!environment.PUBLIC_IS_PAYWALL_ACTIVE) {
		// If the paywall is not active, we don't need to check for an active
		// subscription.
		return;
	}

	// Users with a role in an active organization

	if (!user.role.organization.isActive && !isAllowedWhileInactive(route)) {
		const roleType = user.role.roleType;
		if (roleType === 'ORGADMIN') {
			const inactive = getRoute({
				entity: 'organization',
				pageType: PageTab.Billing,
				id: user.role.organization.id,
				params: { lang: 'en' },
			});

			throw redirect(302, inactive);
		} else {
			const message =
				'This organization does not have an active subscription. Please contact your administrator.';

			throw error(400, { message });
		}
	}
};
