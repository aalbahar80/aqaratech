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
			page: PageType.Id,
			params,
			id: '3',
		},
		'/organizations/1/portfolios/2/tenants/3',
	],

	[
		{
			entity: 'tenant',
			page: PageType.Edit,
			params,
			id: '3',
		},
		'/organizations/1/portfolios/2/tenants/3/edit',
	],

	[
		{
			entity: 'tenant',
			page: PageType.New,
			params,
		},
		'/organizations/1/portfolios/2/tenants/new',
	],
	[
		{
			entity: 'tenant',
			page: PageType.New,
			params,
			predefined: {
				name: 'test',
			},
		},
		'/organizations/1/portfolios/2/tenants/new?name=test',
	],
];

test.each(inputs)('getRoute(%o) === %s', (input, expected) => {
	expect(getRoute(input)).toBe(expected);
});
