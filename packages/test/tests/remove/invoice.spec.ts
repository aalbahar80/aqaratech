import { getRoute, PageTab } from '@self/utils';
import * as R from 'remeda';
import { test } from '../api/api-fixtures';
import { RemoveModel } from './remove-model';

test.use({
	invoicesParams: R.times(3, () => ({})),
});

test('delete invoice', async ({ page, org, invoices }) => {
	const url = getRoute({
		entity: 'lease',
		pageType: PageTab.Invoices,
		id: invoices[0].leaseId,
		params: {
			organizationId: org.organization.id,
			portfolioId: invoices[0].portfolioId,
		},
	});

	const model = new RemoveModel({
		page,
		url,
		items: invoices,
	});

	await model.deleteAndVerify();
});
