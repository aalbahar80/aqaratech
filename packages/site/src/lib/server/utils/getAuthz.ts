import { environment } from '$environment';
import type { User, UserMeta } from '$lib/models/types/auth.type';
import { validateToken } from '$lib/server/utils/validate';
import type { ValidatedUserDto, ValidatedUserDtoRolesInner } from '@self/sdk';

const { authConfig } = environment;

type UserRole = ValidatedUserDtoRolesInner;

const getUserRole = (user: ValidatedUserDto): UserRole => {
	const defaultRole =
		user.roles.find((role) => role.isDefault) || user.roles[0];

	if (!defaultRole) {
		// TODO: handle new user signups/invitations
		throw new Error('User has no roles');
	}
	return defaultRole;
};

const getUserMeta = (role: UserRole): UserMeta => {
	if (role.roleType === 'ORGADMIN') {
		return {
			roleLabel: 'Organization',
			home: '/',
			isAdmin: true,
			isOwner: false,
			isTenant: false,
		};
	} else if (role.roleType === 'PORTFOLIO') {
		return {
			roleLabel: 'Portfolio',
			home: `/portfolios/${role.portfolioId}/dashboard`,
			isAdmin: false,
			isOwner: true,
			isTenant: false,
		};
	} else if (role.roleType === 'TENANT') {
		return {
			roleLabel: 'Tenant',
			home: `/portal/tenant/${role.tenantId}`,
			isAdmin: false,
			isOwner: false,
			isTenant: true,
		};
	} else {
		throw new Error('Unknown role type');
	}
};

export const getUser = async (
	token: string | undefined,
): Promise<App.Session['user']> => {
	if (!token) {
		return;
	}
	try {
		const payload = await validateToken(token, 'idToken');

		const userStuff = payload[
			`${authConfig.AUTH0_API_NAMESPACE}/userStuff`
		] as ValidatedUserDto;

		const role = getUserRole(userStuff);
		const meta = getUserMeta(role);

		const user: User = {
			...userStuff,
			role,
			meta,
		};

		return user;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};
