import { environment } from '$environment';
import type { Authz, User } from '$lib/models/types/auth.type';
import { validateAccessToken } from '$lib/server/utils';
import type { UserDto } from '@self/sdk';

const { authConfig } = environment;

const getAuthz = (user: UserDto): Authz => {
	const orgs: string[] = [];
	const portfolios: string[] = [];
	const tenants: string[] = [];

	user?.roles.forEach((role) => {
		if (role.organizationId) {
			orgs.push(role.organizationId);
		} else if (role.portfolioId) {
			portfolios.push(role.portfolioId);
		} else if (role.tenantId) {
			tenants.push(role.tenantId);
		}
	});

	const defaultRole = user?.roles.find(
		(role) => role.organizationId || role.portfolioId || role.tenantId,
	);

	if (defaultRole?.organizationId) {
		return {
			home: '/',
			orgId: defaultRole.organizationId,
			roleId: defaultRole.id,
			isAdmin: true,
			isOwner: false,
			isTenant: false,
			roleName: 'OrgUser',
		};
	} else if (defaultRole?.portfolioId) {
		return {
			home: `/portfolios/${defaultRole.portfolioId}/dashboard`,
			roleId: defaultRole.id,
			orgId: null,
			isAdmin: false,
			isOwner: true,
			isTenant: false,
			roleName: 'PortfolioUser',
		};
	} else if (defaultRole?.tenantId) {
		return {
			home: `/portal/tenant/${defaultRole.tenantId}`,
			roleId: defaultRole.id,
			orgId: null,
			isAdmin: false,
			isOwner: false,
			isTenant: true,
			roleName: 'TenantUser',
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
