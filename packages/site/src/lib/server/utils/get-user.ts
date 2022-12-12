import { Cookie } from '@self/utils';

import type { RoleSK, User } from '$lib/models/types/auth.type';
import { logger } from '$lib/server/logger';
import { getProfile } from '$lib/server/utils/get-profile';
import { getRoleMeta } from '$lib/utils/get-role-meta';

import type { RequestEvent } from '@sveltejs/kit';

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
			createDate: profile.createdAt,
		}),
	});

	// augment each role with metadata
	const roles = profile.roles.map((role) => ({
		...role,
		meta: getRoleMeta(role),
	}));

	// Resolve user's role
	let role: RoleSK | undefined;

	// First, try to use the selected role
	if (selectedRoleId) {
		logger.debug(`Attempting to set role to selectedRoleId: ${selectedRoleId}`);

		role = roles.find((role) => role.id === selectedRoleId);
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
