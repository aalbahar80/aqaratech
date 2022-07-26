import type { RoleSK, User, UserMeta } from '$lib/models/types/auth.type';
import { validateToken } from '$lib/server/utils/validate';
import type { ValidatedUserDto, ValidatedUserDtoRolesInner } from '@self/sdk';

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
				{ label: 'Portfolios', href: '/portfolios' },
				{ label: 'Properties', href: '/properties' },
				// { label: 'Units', href: '/units' },
				{ label: 'Leases', href: '/leases' },
				{ label: 'Tenants', href: '/tenants' },
				// { label: 'Transactions', href: '/transactions' },
				// { label: 'Expenses', href: '/expenses' },
				// { label: 'Maintenance', href: '/maintenanceOrders' },
			],
		};
	} else if (role.roleType === 'PORTFOLIO') {
		return {
			roleLabel: 'Portfolio',
			home: `/portfolios/${role.portfolioId}/dashboard`,
			navLinks: [
				{ label: 'Properties', href: '/properties' },
				{ label: 'Leases', href: '/leases' },
				{ label: 'Tenants', href: '/tenants' },
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
	try {
		const payload = await validateToken(token, 'idToken');

		// TODO find way to avoid making this call every time.
		const userStuff = await getUserStuff(payload.email as string);

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

const getUserStuff = async (email: string): Promise<ValidatedUserDto> => {
	// const apiUrl = 'http://localhost:3002/users/me';
	// const apiUrl = 'http://localhost:3002/users/' + params.id + '/roles';
	const apiUrl = 'http://localhost:3002/users/by-email?email=' + email;

	const response = await fetch(apiUrl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			// Authorization: 'Bearer ' + token,
		},
	});

	const user = (await response.json()) as ValidatedUserDto;

	return user;
};
