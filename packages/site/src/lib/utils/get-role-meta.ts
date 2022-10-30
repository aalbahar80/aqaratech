import type { UserMeta } from '$lib/models/types/auth.type';
import type { ValidatedRoleDto } from '$api/openapi';
import { entitiesMap } from '@self/utils';

export const getRoleMeta = (role: ValidatedRoleDto): UserMeta => {
	if (role.roleType === 'ORGADMIN') {
		return {
			roleLabel: 'Organization',
			home: '/',
			navLinks: [
				{ label: 'Portfolios', href: '/portfolios' },
				{ label: 'Properties', href: '/properties' },
				{ label: 'Leases', href: '/leases' },
				{ label: 'Tenants', href: '/tenants' },
			],
		};
	} else if (role.roleType === 'PORTFOLIO') {
		return {
			roleLabel: entitiesMap.portfolio.singularCap,
			home: `/portfolios/${role.portfolioId}/financials/summary`,
			navLinks: [
				{ label: 'Properties', href: '/properties' },
				{ label: 'Leases', href: '/leases' },
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
