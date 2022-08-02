import type { RoleSK, User } from '$lib/models/types/auth.type';
import { getRoleMeta } from '$lib/server/utils/get-role-meta';
import {
	Configuration,
	UsersApi,
	type ValidatedRoleDto,
	type ValidatedUserDto,
} from '@self/sdk';

const getDefaultRole = (roles: ValidatedRoleDto[]): RoleSK => {
	const defaultRole = roles.find((role) => role.isDefault) || roles[0];

	if (!defaultRole) {
		// TODO: handle new user signups/invitations
		throw new Error('User has no roles');
	}
	return {
		...defaultRole,
		meta: getRoleMeta(defaultRole),
	};
};

/**
 * Contact the backend to get the user's info.
 * The backend expects an accessToken.
 *
 * Returns undefined if the user is not found,
 * or if validation fails.
 */
export const getUser = async ({
	token,
	selectedRoleId,
}: {
	token: string;
	selectedRoleId?: string;
}): Promise<App.Session['user']> => {
	const profile = await getProfile(token);

	// User not in our db, nothing more to do.
	if (!profile) {
		return undefined;
	}

	// augment each role with metadata
	const roles = profile.roles.map((role) => ({
		...role,
		meta: getRoleMeta(role),
	}));

	let role: RoleSK | undefined;
	if (selectedRoleId) {
		console.log(`Attempting to set role to selectedRoleId: ${selectedRoleId}`);
		role = roles.find((role) => role.id === selectedRoleId);
		if (!role) {
			console.warn(
				`Could not find role with selected id: ${selectedRoleId}. Falling back to default role.`,
			);
		}
	} else {
		role = getDefaultRole(roles);
		console.warn(
			`No role selected, attempting to use default role: ${role.id}`,
		);
	}

	// TODO dedupe error
	if (!role) {
		throw new Error('User has no roles');
	}

	const user: User = {
		...profile,
		roles,
		role,
	};

	return user;
};

const getProfile = async (
	token: string,
): Promise<ValidatedUserDto | undefined> => {
	// TODO find way to avoid making this call every time. (secure-cookie/cache).
	// If session.user isn't used for sensitive data, we can just use the same strategy we use for persisting the x-role-id header/cookie.
	const now = Date.now();

	// users/me doesn't require the x-role-id header, but it does require the accessToken.
	const headers = { Authorization: `Bearer ${token}` };

	const config = new Configuration({
		headers,
		basePath:
			import.meta.env.VITE_API_URL_LOCAL || import.meta.env.VITE_API_URL,
	});

	// Either get the user or return undefined.
	try {
		const user = await new UsersApi(config).findProfile();

		console.debug(
			`Fetched user info for ${user.email} in ${Date.now() - now}ms`,
		);

		return user;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};
