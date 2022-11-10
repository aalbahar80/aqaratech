import { entitiesMap } from 'src/entity/entity-map';
import { PageTypePortfolio } from 'src/route-helpers/enums/page-tab-portfolio.enum';
import { PageTab } from 'src/route-helpers/enums/page-tab.enum';
import { PageType } from 'src/route-helpers/enums/page-type.enum';
import type { GetIdRoute } from 'src/route-helpers/types/id-route.type';

const pageTypeToUrl = {
	[PageType.Edit]: 'edit',
	[PageTypePortfolio.Summary]: 'financials/summary',
	[PageTypePortfolio.Income]: 'financials/income',
	[PageTypePortfolio.Expenses]: 'financials/expenses',
	[PageTypePortfolio.Payouts]: 'financials/payouts/table',
	[PageTab.Files]: 'files',
	[PageTab.Financials]: 'financials',
	[PageTab.Occupancy]: 'occupancy',
	[PageTab.Properties]: 'properties',
	[PageTab.Units]: 'units',
	[PageTab.Leases]: 'leases',
	[PageTab.Invoices]: 'invoices',
	[PageTab.Roles]: 'roles',
	[PageTab.Balance]: 'balance',
};

export const getIdRoute = (input: GetIdRoute, base: string) => {
	const entityName = entitiesMap[input.entity].urlName;

	const entity = `${base}/${entityName}`;

	const idRoute = `${entity}/${input.id}`;

	if (input.pageType === PageType.Id) {
		return idRoute;
	} else if (input.pageType in pageTypeToUrl) {
		return `${idRoute}/${pageTypeToUrl[input.pageType]}`;
	} else {
		throw new Error(`Invalid page address`);
	}
};
