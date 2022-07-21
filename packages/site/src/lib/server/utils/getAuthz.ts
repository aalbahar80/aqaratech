import { environment } from '$environment';
import type { Authz, User } from '$lib/models/types/auth.type';
import { validateAccessToken } from '$lib/server/utils';
import type { ValidatedUserDto } from '@self/sdk';

const { authConfig } = environment;

const getAuthz = (user: ValidatedUserDto): Authz => {
	const defaultRole =
		user.roles.find((role) => role.isDefault) || user.roles[0];

	if (defaultRole?.roleType === 'ORGADMIN') {
		return {
			home: '/',
			orgId: defaultRole.organizationId,
			roleId: defaultRole.id,
			isAdmin: true,
			isOwner: false,
			isTenant: false,
			roleName: 'OrgUser',
			roleLabel: 'Organization',
		};
	} else if (defaultRole?.roleType === 'PORTFOLIO') {
		return {
			home: `/portfolios/${defaultRole.portfolioId}/dashboard`,
			roleId: defaultRole.id,
			orgId: null,
			isAdmin: false,
			isOwner: true,
			isTenant: false,
			roleName: 'PortfolioUser',
			roleLabel: 'Portfolio',
		};
	} else if (defaultRole?.roleType === 'TENANT') {
		return {
			home: `/portal/tenant/${defaultRole.tenantId}`,
			roleId: defaultRole.id,
			orgId: null,
			isAdmin: false,
			isOwner: false,
			isTenant: true,
			roleName: 'TenantUser',
			roleLabel: 'Tenant',
		};
	} else {
		throw new Error('No default role found');
	}
};

export const getUser = async (
	token: string | undefined,
): Promise<App.Session['user']> => {
	if (!token) {
		return;
	}
	try {
		const payload = await validateAccessToken(token, 'idToken');

		const userStuff = payload[
			`${authConfig.AUTH0_API_NAMESPACE}/userStuff`
		] as UserDto;

		const role = getAuthz(userStuff);

		const user: User = {
			...userStuff,
			role,
		};

		return user;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};
