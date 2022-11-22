import { getRoute, PageTab } from '@self/utils';
import * as R from 'remeda';
import { test } from '../api/api-fixtures';
import { RemoveModel } from './remove-model';

test.use({
	leasesParams: R.times(3, () => ({})),
});

test('delete lease', async ({ page, org, leases }) => {
	const url = getRoute({
		entity: 'unit',
		pageType: PageTab.Leases,
		id: leases[0].unitId,
		params: {
			organizationId: org.organization.id,
			portfolioId: leases[0].portfolioId,
		},
	});

	const model = new RemoveModel({
		page,
		url,
		items: leases,
	});

	await model.deleteAndVerify();
});
