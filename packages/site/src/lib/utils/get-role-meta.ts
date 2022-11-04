import type { ValidatedRoleDto } from '$api/openapi';
import type { UserMeta } from '$lib/models/types/auth.type';
import { getRoute } from '$lib/utils/route-helpers/get-route';
import { PageTypePortfolio } from '$lib/utils/route-helpers/route-helpers.type';
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
	} else if (role.roleType === 'PORTFOLIO' && role.portfolioId) {
		return {
			roleLabel: entitiesMap.portfolio.singularCap,
			home: getRoute({
				entity: 'portfolio',
				pageType: PageTypePortfolio.Summary,
				params: {
					organizationId: role.organizationId,
					portfolioId: role.portfolioId,
				},
				id: role.portfolioId,
			}),

			navLinks: [
				{ label: 'Properties', href: '/properties' },
				{ label: 'Leases', href: '/leases' },
			],
		};
	} else if (role.roleType === 'TENANT' && role.tenantId) {
		return {
			roleLabel: 'Tenant',
			home: `/portal/tenant/${role.tenantId}`,
		};
	} else {
		throw new Error('Unknown role type');
	}
};
