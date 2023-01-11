import { entitiesMap } from '../entity/entity-map';

import { PageTab } from './enums/page-tab.enum';
import { PageType } from './enums/page-type.enum';

import type { GetIdRoute } from './types/id-route.type';

const pageTypeToUrl = {
	[PageType.Edit]: 'edit',
	[PageTab.Files]: 'files',
	[PageTab.Occupancy]: 'occupancy',
	[PageTab.Properties]: 'properties',
	[PageTab.Units]: 'units',
	[PageTab.Leases]: 'leases',
	[PageTab.Invoices]: 'invoices',
	[PageTab.Roles]: 'roles',
	[PageTab.Balance]: 'balance',
	[PageTab.ExpenseCategories]: 'expense-categories',
	[PageTab.Maintenance]: 'maintenance-orders',
	[PageTab.Contract]: 'contract',
} as const;

export const getIdRoute = (input: GetIdRoute, base: string) => {
	const entityName = entitiesMap[input.entity].urlName;

	const entity = `${base}/${entityName}`;

	const idRoute = `${entity}/${input.id}`;

	if (input.pageType === PageType.Id) {
		return idRoute;
	} else if (input.pageType in pageTypeToUrl) {
		const title = pageTypeToUrl[input.pageType];
		return `${idRoute}/${title}`;
	} else {
		console.error('Invalid pageType', input.pageType);
		throw new Error(`Invalid page address`);
	}
};
