import type { ValidatedRoleDto, ValidatedUserDto } from '$api/openapi';
import { environment } from '$aqenvironment';
import type { RoleSK, User } from '$lib/models/types/auth.type';
import { getRoleMeta } from '$lib/utils/get-role-meta';
import * as Sentry from '@sentry/node';
import '@sentry/tracing'; // TODO: remove?
import type { LoadEvent } from '@sveltejs/kit';

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
	selectedRoleId,
	loadFetch,
}: {
	selectedRoleId?: string;
	loadFetch: LoadEvent['fetch'];
}): Promise<User | undefined> => {
	console.debug('[getUser] Getting user');
	const profile = await getProfile(loadFetch);

	console.log('[getUser] Got profile', profile);

	// User not in our db, nothing more to do.
	// TODO: roles can be undefined
	if (!profile || !profile.roles) {
		// TODO: use zod to validate profile, roles at lease. This should never happen.
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
	loadFetch: LoadEvent['fetch'],
): Promise<ValidatedUserDto | undefined> => {
	// Sentry
	const transaction = Sentry.getCurrentHub().getScope()?.getTransaction();
	const span = transaction?.startChild({
		op: 'getProfile',
	});

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
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
		// sveltekit's `fetch` allows us to make a credentiale request server-side. The accessToken is stored in a cookie.
		const res = await loadFetch(url.toString(), {
			headers,
			credentials: 'include',
		});

		if (!res.ok) {
			console.warn('[getProfile] Unable to contact backend', res);
			return undefined;
		}

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
