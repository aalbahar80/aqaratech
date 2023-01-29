import type { RoleSK } from '$lib/models/types/auth.type';
import type { RequestEvent } from '@sveltejs/kit';

import { logger } from '$lib/server/logger';

/** Given a list of roles, return the role that can access the current page. */
export const resolveRole = ({
	roles,
	event,
}: {
	roles: RoleSK[];
	event: RequestEvent;
}): RoleSK | undefined => {
	// Get the organizationId from the query string
	const orgId = getOrgIdFromPath(event.url.pathname);

	logger.debug(
		`Attempting to set role to one that can access ${event.url.pathname}`,
	);

	// Find a role that can access the organization
	const rolesInOrg = roles.filter((role) => role.organizationId === orgId);

	if (!rolesInOrg.length) {
		// If there's no role that can access the organization, return undefined
		return undefined;
	}

	// prioritize roles as follows: ORGADMIN, PORTFOLIO, TENANT
	const ranks = {
		ORGADMIN: 0,
		PORTFOLIO: 1,
		TENANT: 2,
	};

	const role = rolesInOrg.reduce((acc, curr) => {
		if (ranks[curr.roleType] < ranks[acc.roleType]) {
			return curr;
		}

		return acc;
	});

	return role;
};

const getOrgIdFromPath = (path: string) => {
	// split items, then get the item after the one that is equal to 'organizations'
	const orgId = path
		.split('/')
		.slice(path.split('/').indexOf('organizations') + 1)
		.shift();

	return orgId;
};
