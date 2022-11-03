import {
	PageType,
	type GetRouteInput,
} from '$lib/utils/route-helpers/route-helpers.type';
import { expect, test } from 'vitest';
import { getRoute } from './get-route';

const params = {
	organizationId: '1',
	portfolioId: '2',
};

const inputs: [GetRouteInput, string][] = [
	[
		{
			entity: 'tenant',
			pageType: PageType.Id,
			params,
			id: '3',
		},
		'/organizations/1/portfolios/2/tenants/3',
	],

	[
		{
			entity: 'tenant',
			pageType: PageType.Edit,
			params,
			id: '3',
		},
		'/organizations/1/portfolios/2/tenants/3/edit',
	],

	[
		{
			entity: 'tenant',
			pageType: PageType.New,
			params,
		},
		'/organizations/1/portfolios/2/tenants/new',
	],
	[
		{
			entity: 'tenant',
			pageType: PageType.New,
			params,
			predefined: {
				name: 'test',
			},
		},
		'/organizations/1/portfolios/2/tenants/new?name=test',
	],
	[
		{
			entity: 'tenant',
			pageType: PageType.List,
			params,
		},
		'/organizations/1/portfolios/2/tenants',
	],
];

test.each(inputs)('getRoute(%o) === %s', (input, expected) => {
	expect(getRoute(input)).toBe(expected);
});
