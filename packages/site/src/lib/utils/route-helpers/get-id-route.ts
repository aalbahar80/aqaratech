import {
	PageType,
	PageTypePortfolio,
	type GetIdRouteInput,
} from '$lib/utils/route-helpers/route-helpers.type';
import { entitiesMap } from '@self/utils';

const pageTypeToUrl = {
	[PageType.Edit]: 'edit',
	[PageTypePortfolio.Summary]: 'financials/summary',
	[PageTypePortfolio.Income]: 'financials/income',
	[PageTypePortfolio.Expenses]: 'financials/expenses',
	[PageTypePortfolio.Payouts]: 'financials/payouts/table',
};

export const getIdRoute = (input: GetIdRouteInput, base: string) => {
	const entityName = entitiesMap[input.entity].urlName;

	const entity = `${base}/${entityName}`;

	if (input.pageType === PageType.Id) {
		return `${entity}/${input.id}`;
	} else if (pageTypeToUrl[input.pageType]) {
		return `${entity}/${input.id}/${pageTypeToUrl[input.pageType]}`;
	} else {
		throw new Error(`Invalid page address`);
	}
};
