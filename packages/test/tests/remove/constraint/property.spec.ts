import { expect } from '@playwright/test';
import * as R from 'remeda';

import { getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';
import { IdPage } from '../../models/id-page';

test.use({
	unitsParams: R.times(1, () => ({})),
});

test('delete property w/unit', async ({
	page,
	org,
	portfolio,
	property,
	units: _units,
}) => {
	const url = getRoute({
		entity: 'property',
		pageType: PageType.Id,
		id: property.id,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		},
	});

	await page.goto(url);

	const idPage = new IdPage({ page });
	await idPage.delete();

	const text =
		'Unable to delete property. Please delete any unit associated with this property before attempting to delete the property.';

	const toast = page.getByText(text);

	await expect(toast).toBeVisible();
});
