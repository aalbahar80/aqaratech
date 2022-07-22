import { environment } from '$environment';
import type { RoleSK, User, UserMeta } from '$lib/models/types/auth.type';
import { validateToken } from '$lib/server/utils/validate';
import type { ValidatedUserDto, ValidatedUserDtoRolesInner } from '@self/sdk';

const { authConfig } = environment;

const getDefaultRole = (roles: ValidatedUserDtoRolesInner[]): RoleSK => {
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

const getRoleMeta = (role: ValidatedUserDtoRolesInner): UserMeta => {
	if (role.roleType === 'ORGADMIN') {
		return {
			roleLabel: 'Organization',
			home: '/',
			navLinks: [
				{ name: 'Portfolios', href: '/portfolios' },
				{ name: 'Properties', href: '/properties' },
				// { name: 'Units', href: '/units' },
				{ name: 'Leases', href: '/leases' },
				{ name: 'Tenants', href: '/tenants' },
				// { name: 'Transactions', href: '/transactions' },
				// { name: 'Expenses', href: '/expenses' },
				// { name: 'Maintenance', href: '/maintenanceOrders' },
			],
		};
	} else if (role.roleType === 'PORTFOLIO') {
		return {
			roleLabel: 'Portfolio',
			home: `/portfolios/${role.portfolioId}/dashboard`,
			navLinks: [
				{ name: 'Properties', href: '/properties' },
				{ name: 'Leases', href: '/leases' },
				{ name: 'Tenants', href: '/tenants' },
			],
		};
	} else if (role.roleType === 'TENANT') {
		return {
			roleLabel: 'Tenant',
			home: `/portal/tenant/${role.tenantId}`,
		};
	} else {
		throw new Error('Unknown role type');
	}
};

export const getUser = async (
	token: string | undefined,
	selectedRoleId?: string,
): Promise<App.Session['user']> => {
	if (!token) {
		return;
	}
	try {
		const payload = await validateToken(token, 'idToken');

		const userStuff = payload[
			`${authConfig.AUTH0_API_NAMESPACE}/userStuff`
		] as ValidatedUserDto;

		// augment each role with metadata
		const roles = userStuff.roles.map((role) => ({
			...role,
			meta: getRoleMeta(role),
		}));

		const role = selectedRoleId
			? roles.find((role) => role.id === selectedRoleId)
			: getDefaultRole(roles);

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
