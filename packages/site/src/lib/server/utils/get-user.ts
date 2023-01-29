import { Cookie } from '@self/utils';

import type { RoleSK, User } from '$lib/models/types/auth.type';
import type { RequestEvent } from '@sveltejs/kit';

import { baseLocale } from '$i18n/i18n-util';
import { logger } from '$lib/server/logger';
import { getProfile } from '$lib/server/utils/get-profile';
import { getRoleMeta } from '$lib/utils/get-role-meta';

/**
 * Contact the backend to get the user's info.
 * The backend expects an accessToken.
 *
 * Returns undefined if the user is not found,
 * or if validation fails.
 */
export const getUser = async ({
	selectedRoleId,
	event,
}: {
	selectedRoleId: string | undefined;
	event: RequestEvent;
}) => {
	logger.debug('[getUser] Getting user');

	const profile = await getProfile(event);

	logger.debug('Got profile', {
		message: JSON.stringify({
			id: profile.id,
			email: profile.email,
			roleCount: profile.roles.length,
		}),
	});

	// augment each role with metadata
	const roles = profile.roles.map((role) => ({
		...role,
		meta: getRoleMeta(role, event.locals.LL, event.locals.locale ?? baseLocale),
	}));

	// Resolve user's role
	let role: RoleSK | undefined;

	// First, try to use the selected role.
	// This mean if the Role cookie is set, we always use that role.
	if (selectedRoleId) {
		logger.debug(`Attempting to set role to selectedRoleId: ${selectedRoleId}`);

		role = roles.find((role) => role.id === selectedRoleId);
	} else {
		// If there's no selected role, try to use a role that can access the
		// current page.

		// This case usually happens when the user was redirected to the login page
		// while trying to access a page that required authentication. We should
		// try to set the role to one that can access that page.

		// Get the organizationId from the query string
		const orgId = getOrgIdFromPath(event.url.pathname);

		logger.debug(
			`Attempting to set role to one that can access ${event.url.pathname}`,
		);

		// Find a role that can access the organization
		const rolesInOrg = roles.filter((role) => role.organizationId === orgId);

		// prioritize roles as follows: ORGADMIN, PORTFOLIO, TENANT
		const ranks = {
			ORGADMIN: 0,
			PORTFOLIO: 1,
			TENANT: 2,
		};

		role = rolesInOrg.reduce((acc, curr) => {
			if (ranks[curr.roleType] < ranks[acc.roleType]) {
				return curr;
			}

			return acc;
		});
	}

	// If that fails, or if no role was selected, use the default role
	if (!role) {
		// clear the role cookie if it exists since it has failed to lead to a valid role
		event.cookies.set(Cookie.role, '', { maxAge: 0, path: '/' });

		logger.debug('Could not find selected role. Using default role');

		role = roles[0];
	}

	const user: User = {
		...profile,
		roles,
		role,
	};

	return user;
};

const getOrgIdFromPath = (path: string) => {
	// split items, then get the item after the one that is equal to 'organizations'
	const orgId = path
		.split('/')
		.slice(path.split('/').indexOf('organizations') + 1)
		.shift();

	return orgId;
};
