import { entitiesMap } from 'src/entity/entity-map';
import { PageTypePortfolio } from 'src/route-helpers/enums/page-tab-portfolio.enum';
import { PageTab } from 'src/route-helpers/enums/page-tab.enum';
import { PageType } from 'src/route-helpers/enums/page-type.enum';
import type { GetIdRouteInput } from 'src/route-helpers/types/id-route.type';

const pageTypeToUrl = {
	[PageType.Edit]: 'edit',
	[PageTypePortfolio.Summary]: 'financials/summary',
	[PageTypePortfolio.Income]: 'financials/income',
	[PageTypePortfolio.Expenses]: 'financials/expenses',
	[PageTypePortfolio.Payouts]: 'financials/payouts/table',
	[PageTab.Details]: '',
	[PageTab.Files]: 'files',
	[PageTab.Financials]: 'financials',
	[PageTab.Occupancy]: 'occupancy',
	[PageTab.Units]: 'units',
	[PageTab.Leases]: 'leases',
	[PageTab.Invoices]: 'invoices',
};

export const getIdRoute = (input: GetIdRouteInput, base: string) => {
	const entityName = entitiesMap[input.entity].urlName;

	const entity = `${base}/${entityName}`;

	if (input.pageType === PageType.Id) {
		return `${entity}/${input.id}`;
	} else if (input.pageType in pageTypeToUrl) {
		return `${entity}/${input.id}/${pageTypeToUrl[input.pageType]}`;
	} else {
		throw new Error(`Invalid page address`);
	}
};
