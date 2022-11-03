import { getPortfolioRoute } from '$lib/utils/route-helpers/get-portfolio-route';
import type { GetListRouteInput } from '$lib/utils/route-helpers/route-helpers.type';
import { entitiesMap } from '@self/utils';

export const getListRoute = (input: GetListRouteInput) => {
	const portfolio = getPortfolioRoute(input.params);

	const entity = entitiesMap[input.entity].urlName;

	return `${portfolio}/${entity}`;
};
