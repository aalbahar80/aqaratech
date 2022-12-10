import * as R from 'remeda';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../api/api-fixtures';

import { RemoveModel } from './remove-model';

test.use({
	unitsParams: R.times(3, () => ({})),
});

test('delete unit', async ({ page, org, units }) => {
	const url = getRoute({
		entity: 'property',
		pageType: PageTab.Units,
		id: units[0].propertyId,
		params: {
			organizationId: org.organization.id,
			portfolioId: units[0].portfolioId,
		},
	});

	const model = new RemoveModel({
		page,
		url,
		items: units,
	});

	await model.deleteAndVerify();
});
