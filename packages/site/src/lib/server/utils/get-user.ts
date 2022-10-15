import type { ValidatedRoleDto, ValidatedUserDto } from '$api/openapi';
import { environment } from '$aqenvironment';
import type { RoleSK, User } from '$lib/models/types/auth.type';
import { logger } from '$lib/server/logger';
import { getRoleMeta } from '$lib/utils/get-role-meta';
import { Cookie } from '@self/utils';
import * as Sentry from '@sentry/node';
import '@sentry/tracing'; // TODO: remove?
import type { RequestEvent } from '@sveltejs/kit';

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
	event,
}: {
	selectedRoleId?: string;
	event: RequestEvent;
}): Promise<User | undefined> => {
	logger.debug('[getUser] Getting user');

	const profile = await getProfile(event);

	logger.log('Got profile', {
		message: JSON.stringify({
			id: profile?.id,
			email: profile?.email,
			roleCount: profile?.roles?.length,
			createDate: profile?.createdAt,
		}),
	});

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

		logger.log({
			level: 'warn',
			message: 'Could not find selected role. Using default role',
		});

		role = getDefaultRole(roles);
	}

	const user: User = {
		...profile,
		roles,
		role,
	};

	return user;
};

const getProfile = async (
	event: RequestEvent,
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
		logger.log({
			level: 'debug',
			message: 'Could not get span for getProfile',
		});
	}

	// Either get the user or return undefined.
	// construct url
	const url = new URL(`${environment.PUBLIC_API_URL_LOCAL}/users/me`);

	// fetch user
	// sveltekit's `fetch` allows us to make a credentiale request server-side. The accessToken is stored in a cookie.
	// try {
	const res = await event.fetch(url.toString(), {
		headers,
		credentials: 'include',
	});

	if (!res.ok) {
		// It's important to check for res.ok because fetch will not throw an error.
		// This means the backend is up. But there was an issue with the request.
		// Most likely, user does not exist in our db yet.
		logger.warn(
			'[getProfile] Backend responded with an error when fetching user',
			res,
		);

		logger.log({
			level: 'warn',
			message:
				'Backend responded with an error when fetching user: ' + res.status,
		});

		logger.log({
			level: 'warn',
			message: JSON.stringify({
				status: res.status,
				statusText: res.statusText,
				url: res.url,
			}),
		});

		return undefined;
	}

	const data = (await res.json()) as ValidatedUserDto;

	return data;
};
