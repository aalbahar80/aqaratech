import type { RoleSK, User } from '$lib/models/types/auth.type';
import { getRoleMeta } from '$lib/server/utils/get-role-meta';
import { validateToken } from '$lib/server/utils/validate';
import type { ValidatedRoleDto, ValidatedUserDto } from '@self/sdk';

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

export const getUser = async ({
	token,
	selectedRoleId,
}: {
	token: string | undefined;
	selectedRoleId?: string;
}): Promise<App.Session['user']> => {
	if (!token) {
		return;
	}
	// keep this in try/catch? how was this not redirecting before?
	// hint: look at getSession when it calls get user.
	// this should throw if the token is invalid
	await validateToken(token, 'idToken');
	try {
		const userStuff = await getUserStuff(token, selectedRoleId);

		// augment each role with metadata
		const roles = userStuff.roles.map((role) => ({
			...role,
			meta: getRoleMeta(role),
		}));

		let role: RoleSK | undefined;
		if (selectedRoleId) {
			console.log(
				`Attempting to set role to selectedRoleId: ${selectedRoleId}`,
			);
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
			...userStuff,
			roles,
			role,
		};

		return user;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

const getUserStuff = async (
	token: string,
	selectedRoleId?: string,
): Promise<ValidatedUserDto> => {
	// TODO find way to avoid making this call every time. (secure-cookie/cache).
	// If session.user isn't used for sensitive data, we can just use the same strategy we use for persisting the x-role-id header/cookie.
	const now = Date.now();
	const apiUrl = import.meta.env.VITE_API_URL_LOCAL + '/users/me';

	// TODO ensure backend is expecting an id token for the users/me endpoint
	const response = await fetch(apiUrl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
			...(selectedRoleId ? { 'x-role-id': selectedRoleId } : {}),
		},
	});

	const user = (await response.json()) as ValidatedUserDto;
	console.debug(`Fetched user info for ${user.email} in ${Date.now() - now}ms`);

	return user;
};
