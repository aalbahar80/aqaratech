import {
	getOrganizationRoute,
	getPortfolioRoute,
} from '$lib/utils/route-helpers/get-portfolio-route';
import type { GetRouteInput } from '$lib/utils/route-helpers/route-helpers.type';

export const getBaseRoute = (
	input: Pick<GetRouteInput, 'entity' | 'params'>,
) => {
	if (input.entity === 'tenant' || input.entity === 'portfolio') {
		const organization = getOrganizationRoute(input.params);

		return organization;
	} else {
		const portfolio = getPortfolioRoute(input.params);

		return portfolio;
	}
};
