import { getPortfolioRoute } from '$lib/utils/route-helpers/get-portfolio-route';
import {
	PageType,
	type GetIdRouteInput,
} from '$lib/utils/route-helpers/route-helpers.type';
import { entitiesMap } from '@self/utils';

export const getIdRoute = (input: GetIdRouteInput) => {
	const portfolio = getPortfolioRoute(input.params);

	const entity = entitiesMap[input.entity].urlName;

	if (input.pageType === PageType.Id) {
		return `${portfolio}/${entity}/${input.id}`;
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	} else if (input.pageType === PageType.Edit) {
		return `${portfolio}/${entity}/${input.id}/edit`;
	} else {
		throw new Error(`Invalid page address`);
	}
};
