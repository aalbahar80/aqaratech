import {
	entitiesMap,
	getRoute,
	PageType,
	PageTypePortfolio,
} from '@self/utils';

import type { UserMeta } from '$lib/models/types/auth.type';

import type { ValidatedRoleDto } from '$api/openapi';

export const getRoleMeta = (role: ValidatedRoleDto): UserMeta => {
	const organizationId = role.organizationId;

	if (role.roleType === 'ORGADMIN') {
		return {
			roleLabel: 'Organization',
			home: getRoute({
				entity: 'portfolio',
				pageType: PageType.List,
				params: {
					organizationId,
				},
			}),
		};
	} else if (role.roleType === 'PORTFOLIO' && role.portfolioId) {
		const portfolioId = role.portfolioId;

		return {
			roleLabel: entitiesMap.portfolio.singularCap,
			home: getRoute({
				entity: 'portfolio',
				pageType: PageTypePortfolio.Summary,
				params: {
					organizationId,
					portfolioId,
				},
				id: portfolioId,
			}),
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
