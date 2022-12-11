import { expect } from '@playwright/test';
import * as R from 'remeda';

import { getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { IdPage } from '../../models/id-page';

test.use({
	leasesParams: R.times(1, () => ({})),
});

test('delete tenant w/lease', async ({
	page,
	org,
	tenant,
	leases: _leases,
}) => {
	const url = getRoute({
		entity: 'tenant',
		pageType: PageType.Id,
		id: tenant.id,
		params: {
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const idPage = new IdPage({ page });
	await idPage.delete();

	const text =
		'Unable to delete tenant. Please delete any lease associated with this tenant before attempting to delete the tenant.';

	const toast = page.getByText(text);

	await expect(toast).toBeVisible();
});
