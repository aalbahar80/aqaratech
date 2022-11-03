import {
	getOrganizationRoute,
	getPortfolioRoute,
} from '$lib/utils/route-helpers/get-portfolio-route';
import type { GetRouteInput } from '$lib/utils/route-helpers/route-helpers.type';

export const getBaseRoute = (
	input: Pick<GetRouteInput, 'entity' | 'params'>,
) => {
	if (input.entity === 'tenant' || input.entity === 'portfolio') {
		// base is always organization
		const organization = getOrganizationRoute(input.params);

		return organization;
	} else if ('portfolioId' in input.params) {
		// base is portfolio if portfolioId is present
		const portfolio = getPortfolioRoute(input.params);

		return portfolio;
	} else {
		// default to organization base
		const organization = getOrganizationRoute(input.params);

		return organization;
	}
};
