import { expect } from '@playwright/test';
import * as R from 'remeda';

import { getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { IdPage } from '../../models/id-page';

test.use({
	invoicesParams: R.times(1, () => ({})),
});

test('delete lease w/invoice', async ({
	page,
	org,
	portfolio,
	lease,
	invoices: _invoices,
}) => {
	const url = getRoute({
		entity: 'lease',
		pageType: PageType.Id,
		id: lease.id,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		},
	});

	await page.goto(url);

	const idPage = new IdPage({ page });
	await idPage.delete();

	const text =
		'Unable to delete lease. Please delete any invoice associated with this lease before attempting to delete the lease.';

	const toast = page.getByText(text);

	await expect(toast).toBeVisible();
});
