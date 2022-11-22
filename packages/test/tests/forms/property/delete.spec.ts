import { getRoute, PageTab } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';
import { RemoveModel } from '../remove-model';

test.use({
	propertiesParams: R.times(3, () => ({})),
});

test('delete property', async ({ page, org, property, properties }) => {
	const url = getRoute({
		entity: 'portfolio',
		id: property.portfolioId,
		pageType: PageTab.Properties,
		params: {
			organizationId: org.organization.id,
		},
	});

	const model = new RemoveModel({
		page,
		url,
		items: properties,
	});

	await model.deleteAndVerify();
});
