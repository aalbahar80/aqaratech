import { getOrganizationRoute, getPortfolioRoute } from './get-portfolio-route';
import type { GetRoute } from './types/route-helpers.type';

export const getBaseRoute = (input: Pick<GetRoute, 'entity' | 'params'>) => {
	if (
		input.entity === 'tenant' ||
		input.entity === 'portfolio' ||
		input.entity === 'role' ||
		input.entity === 'expenseCategory' ||
		input.entity === 'file'
	) {
		// base is always organization
		const organization = getOrganizationRoute(input.params);

		return organization;
	} else if ('portfolioId' in input.params) {
		// base is portfolio if portfolioId is present
		const portfolio = getPortfolioRoute(input.params);

		return portfolio;
	} else if (input.entity === 'organization') {
		// Avoid adding base here. It will be added in getIdRoute instead.
		return '';
	} else {
		// default to organization base
		const organization = getOrganizationRoute(input.params);

		return organization;
	}
};
