import {
	FetchError,
	ResponseError,
	type ValidatedRoleDto,
	type ValidatedUserDto,
} from '$api/openapi';
import { environment } from '$aqenvironment';
import type { RoleSK, User } from '$lib/models/types/auth.type';
import { getRoleMeta } from '$lib/utils/get-role-meta';
import * as Sentry from '@sentry/node';
import '@sentry/tracing'; // TODO: remove?
import { error } from '@sveltejs/kit';

const getDefaultRole = (roles: ValidatedRoleDto[]): User['role'] => {
	const defaultRole = roles.find((role) => role.isDefault) || roles[0];

	if (!defaultRole) {
		return undefined;
	} else {
		return {
			...defaultRole,
			meta: getRoleMeta(defaultRole),
		};
	}
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
}): Promise<User | undefined> => {
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
			`No role selected, attempting to use default role: ${role?.id}`,
		);
	}

	const user: User = {
		...profile,
		roles,
		role,
	};

	return user;
};

const getProfile = async (
	accessToken: string,
): Promise<ValidatedUserDto | undefined> => {
	// Sentry
	const transaction = Sentry.getCurrentHub().getScope()?.getTransaction();
	const span = transaction?.startChild({
		op: 'getProfile',
	});

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		// users/me endpoint only requires accessToken, not x-role-id header.
		Authorization: `Bearer ${accessToken}`,
	};

	if (span) {
		headers['sentry-trace'] = `${span.toTraceparent()}`;
	} else {
		console.warn('[getProfile] Could not get span/tranaction');
	}

	// Either get the user or return undefined.
	try {
		// construct url
		const url = new URL(`${environment.PUBLIC_API_URL_LOCAL}/users/me`);

		// fetch user
		const res = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				// users/me doesn't require the x-role-id header, but it does require the accessToken.
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const data = (await res.json()) as ValidatedUserDto;

		return data;
	} catch (e) {
		// TODO: differentiate between errors caused by:
		// 1. user doesn't exist in db
		// 2. backend not available

		console.error(e);
		return undefined;
	} finally {
		span?.finish();
	}
};
