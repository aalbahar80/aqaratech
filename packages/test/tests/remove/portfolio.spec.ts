import { getRoute, PageType } from '@self/utils';
import * as R from 'remeda';
import { test } from '../api/api-fixtures';
import { RemoveModel } from './remove-model';

test.use({
	portfoliosParams: R.times(3, () => ({})),
});

test('delete portfolio', async ({ page, org, portfolios }) => {
	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.List,
		params: {
			organizationId: org.organization.id,
		},
	});

	const model = new RemoveModel({
		page,
		url,
		items: portfolios,
	});

	await model.deleteAndVerify();
});
