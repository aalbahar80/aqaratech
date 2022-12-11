import { expect } from '@playwright/test';
import * as R from 'remeda';

import { getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { IdPage } from '../../models/id-page';

test.use({
	leasesParams: R.times(1, () => ({})),
});

test('delete unit w/lease', async ({
	page,
	org,
	portfolio,
	property,
	unit,
	leases: _leases,
}) => {
	const url = getRoute({
		entity: 'unit',
		pageType: PageType.Id,
		id: unit.id,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			propertyId: property.id,
		},
	});

	await page.goto(url);

	const idPage = new IdPage({ page });
	await idPage.delete();

	const text =
		'Unable to delete unit. Please delete any lease associated with this unit before attempting to delete the unit.';

	const toast = page.getByText(text);

	await expect(toast).toBeVisible();
});
