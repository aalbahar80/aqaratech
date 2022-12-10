import { describe, expect, test } from 'vitest';

import { PageTab } from 'src/route-helpers/enums/page-tab.enum';
import { getRoute } from 'src/route-helpers/get-route';

const pageTypes = [
	[PageTab.Files, 'files'],
	[PageTab.Occupancy, 'occupancy'],
	[PageTab.Units, 'units'],
	[PageTab.Leases, 'leases'],
	[PageTab.Invoices, 'invoices'],
] as const;

const entityTypes = [
	{
		entity: 'portfolio',
		url: (expected: string) => `/organizations/1/portfolios/2/${expected}`,
		baseInput: {
			entity: 'portfolio',
			params: { organizationId: '1' },
			id: '2',
		},
	},
	{
		entity: 'property',
		url: (expected: string) =>
			`/organizations/1/portfolios/2/properties/3/${expected}`,
		baseInput: {
			entity: 'property',
			params: { organizationId: '1', portfolioId: '2' },
			id: '3',
		},
	},
	{
		entity: 'tenant',
		url: (expected: string) => `/organizations/1/tenants/2/${expected}`,
		baseInput: {
			entity: 'tenant',
			params: { organizationId: '1' },
			id: '2',
		},
	},
] as const;

describe.each(entityTypes)('describe %o', (entityType) => {
	test.each(pageTypes)(`%s route url`, (pageType, expected) => {
		const url = entityType.url(expected);

		const input = {
			...entityType.baseInput,
			pageType,
		};

		// @ts-expect-error test
		const result = getRoute(input);

		expect(result).toBe(url);
	});
});
