import { PageAddress } from '$lib/utils/route-helpers/route-helpers.type';
import { expect, test } from 'vitest';
import { getRoute } from './get-routes';

test('getRoute', () => {
	const result = getRoute({
		entity: 'expense',
		id: '3',
		page: PageAddress.Edit,
		params: {
			organizationId: '1',
			portfolioId: '2',
		},
	});
	expect(result).toBe('/organizations/1/portfolios/2/expenses/3/edit');
});
