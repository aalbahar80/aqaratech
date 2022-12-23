import * as R from 'remeda';

import { getRoute, PageTypePortfolio } from '@self/utils';

import { test } from '../api/api-fixtures';

import { RemoveModel } from './remove-model';

test.use({
	expensesParams: R.times(3, () => ({})),
});

test.fixme('delete expense', async ({ page, org, expenses }) => {
	// TODO: add /table routes to getRoute
	const url = getRoute({
		entity: 'portfolio',
		pageType: PageTypePortfolio.Expenses,
		id: expenses[0].portfolioId,
		params: {
			organizationId: org.organization.id,
			portfolioId: expenses[0].portfolioId,
		},
	});

	const model = new RemoveModel({
		page,
		url,
		items: expenses,
	});

	await model.deleteAndVerify();
});
