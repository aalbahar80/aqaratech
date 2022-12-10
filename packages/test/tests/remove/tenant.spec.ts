import * as R from 'remeda';

import { getRoute, PageType } from '@self/utils';

import { test } from '../api/api-fixtures';

import { RemoveModel } from './remove-model';

test.use({
	tenantsParams: R.times(3, () => ({})),
});

test('delete tenant', async ({ page, org, tenants }) => {
	const url = getRoute({
		entity: 'tenant',
		pageType: PageType.List,
		params: {
			organizationId: org.organization.id,
		},
	});

	const model = new RemoveModel({
		page,
		url,
		items: tenants,
	});

	await model.deleteAndVerify();
});
