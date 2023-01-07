import { getRoute, PageType, PageTypePortfolio } from '@self/utils';

import type { ValidatedRoleDto } from '$api/openapi';
// eslint-disable-next-line import/no-named-as-default
import type LL from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';
import type { UserMeta } from '$lib/models/types/auth.type';
import type { ReadableOf } from './readable-of';

export const getRoleMeta = (
	role: ValidatedRoleDto,
	L: ReadableOf<typeof LL>,
	locale: Locales,
): UserMeta => {
	const langParam = {
		lang: locale,
	};

	const organizationId = role.organizationId;

	if (role.roleType === 'ORGADMIN') {
		return {
			roleLabel: L.entity.organization.singular(),
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
			roleLabel: L.entity.portfolio.singular(),
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
			roleLabel: L.entity.tenant.singular(),
			home: `${locale}/portal/tenant/${role.tenantId}`,
		};
	} else {
		throw new Error('Unknown role type');
	}
};
