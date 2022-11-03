import { getPortfolioRoute } from '$lib/utils/route-helpers/get-portfolio-route';
import type { GetFormRouteInput } from '$lib/utils/route-helpers/route-helpers.type';
import { entitiesMap } from '@self/utils';

export const getFormRoute = (input: GetFormRouteInput) => {
	const portfolio = getPortfolioRoute(input.params);

	const entity = entitiesMap[input.entity].urlName;

	const base = `${portfolio}/${entity}`;

	if (input.predefined) {
		const query = new URLSearchParams(input.predefined);

		return `${base}/new?${query.toString()}`;
	} else {
		return `${base}/new`;
	}
};
