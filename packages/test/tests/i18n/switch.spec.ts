import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../api/api-fixtures';

test('locale switch updates $page.pathname', async ({ page, portfolio }) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTab.Properties,
		params: {
			organizationId: portfolio.organizationId,
			lang: 'en',
		},
	});

	await page.goto(url);

	// check Properties tab is active
	const tab = page.getByRole('link', { name: 'Properties' });
	await expect(tab).toHaveAttribute('data-testid', 'active');

	const ar = page.getByRole('list').getByRole('link', { name: 'ar' });
	await ar.click();

	await page.waitForNavigation();

	// check Properties tab is still active
	// TODO: enable once translation is implemented
	// const tabAr = page.getByRole('link', { name: 'العقارات' });
	await expect(tab).toHaveAttribute('data-testid', 'active');
});
