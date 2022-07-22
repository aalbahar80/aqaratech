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
			home: '/',
			orgId: role.organizationId,
			roleId: role.id,
			isAdmin: true,
			isOwner: false,
			isTenant: false,
			roleLabel: 'Organization',
		};
	} else if (role.roleType === 'PORTFOLIO') {
		return {
			home: `/portfolios/${role.portfolioId}/dashboard`,
			roleId: role.id,
			orgId: null,
			isAdmin: false,
			isOwner: true,
			isTenant: false,
			roleLabel: 'Portfolio',
		};
	} else if (role.roleType === 'TENANT') {
		return {
			home: `/portal/tenant/${role.tenantId}`,
			roleId: role.id,
			orgId: null,
			isAdmin: false,
			isOwner: false,
			isTenant: true,
			roleLabel: 'Tenant',
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
