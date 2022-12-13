import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test } from '../api/api-fixtures';

test.use({
	portfoliosParams: [{ fullName: 'Alex Anderson' }],
});

test('search: portfolio is enabled', async ({
	page,
	org,
	portfolios: _portfolios,
}) => {
	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.List,
		params: {
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const btn = page.getByRole('button', { name: 'Search' });
	await btn.click();

	// search
	const input = page.getByPlaceholder('Search...');
	await input.fill('Alex');

	// check result
	const result = page.getByRole('option', { name: 'Alex Anderson' });
	await expect(result).toBeVisible();

	// navigate to result
	await result.click();
	const name = page
		.getByTestId('details-pane')
		.getByTestId('fullName')
		.getByText('Alex Anderson');

	await expect(name).toBeVisible();
});
