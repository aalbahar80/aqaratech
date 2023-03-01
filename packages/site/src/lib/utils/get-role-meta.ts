import { getRoute, PageType, PageTypePortfolio } from '@self/utils';

import type { ValidatedRoleDto } from '$api/openapi';
import type L from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';
import type { UserMeta } from '$lib/models/types/auth.type';
import type { ReadableOf } from './readable-of';

export const getRoleMeta = (
	role: ValidatedRoleDto,
	LL: ReadableOf<typeof L>,
	locale: Locales,
): UserMeta => {
	const langParam = {
		lang: locale,
	};

	const organizationId = role.organizationId;

	if (role.roleType === 'ORGADMIN') {
		return {
			roleLabel: LL.entity.organization.singular(),
			home: getRoute({
				entity: 'portfolio',
				pageType: PageType.List,
				params: {
					organizationId,
					...langParam,
				},
			}),
		};
	} else if (role.roleType === 'PORTFOLIO' && role.portfolioId) {
		const portfolioId = role.portfolioId;

		return {
			roleLabel: LL.entity.portfolio.singular(),
			home: getRoute({
				entity: 'portfolio',
				pageType: PageTypePortfolio.Summary,
				params: {
					organizationId,
					portfolioId,
					...langParam,
				},
				id: portfolioId,
			}),
		};
	} else if (role.roleType === 'TENANT' && role.tenantId) {
		return {
			roleLabel: LL.entity.tenant.singular(),
			home: getRoute({
				entity: 'leaseInvoice',
				pageType: PageType.List,
				params: { organizationId, tenantId: role.tenantId, ...langParam },
			}),
		};
	} else {
		throw new Error('Unknown role type');
	}
};
