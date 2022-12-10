import * as R from 'remeda';

import { getRoute, PageTypePortfolio } from '@self/utils';

import { test } from '../api/api-fixtures';

import { RemoveModel } from './remove-model';

test.use({
	payoutsParams: R.times(3, () => ({})),
});

test('delete payout', async ({ page, org, payouts }) => {
	const url = getRoute({
		entity: 'portfolio',
		pageType: PageTypePortfolio.Payouts,
		id: payouts[0].portfolioId,
		params: {
			organizationId: org.organization.id,
			portfolioId: payouts[0].portfolioId,
		},
	});

	const model = new RemoveModel({
		page,
		url,
		items: payouts,
	});

	await model.deleteAndVerify();
});
