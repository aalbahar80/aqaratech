import { expect } from '@playwright/test';
import * as R from 'remeda';

import { getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';

test.use({
	propertiesParams: R.times(1, () => ({})),
});

test('delete portfolio w/property', async ({
	page,
	org,
	portfolio,
	properties,
}) => {
	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.Id,
		id: portfolio.id,
		params: {
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const menu = page.getByRole('button', { name: 'Open options' });
	await menu.click();

	const remove = page.getByRole('button', { name: 'Delete' });
	await remove.click();

	const modal = page.getByTestId('modal');
	const confirm = modal.getByRole('button', { name: 'Delete' });
	await confirm.click();

	const text =
		'Unable to delete portfolio. Please delete any property associated with this portfolio before attempting to delete the portfolio.';

	const toast = page.getByText(text);

	await expect(toast).toBeVisible();
});
