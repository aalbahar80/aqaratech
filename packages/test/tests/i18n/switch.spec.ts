import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../api/api-fixtures';

test.skip(({ isMobile }) => isMobile === true);

test('locale switch updates $page.pathname', async ({ page, portfolio }) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTab.Properties,
		params: {
			organizationId: portfolio.organizationId,
			lang: 'ar',
		},
	});

	await page.goto(url);

	const tabAr = page.getByRole('link', { name: 'عقارات', exact: true });
	const tabEn = page.getByRole('link', { name: 'Properties' });

	await expect(tabAr).toHaveAttribute('data-testid', 'active');

	const resPromise = page.waitForResponse((res) => res.status() === 200);

	// const arLocale = page.getByRole('link', { name: 'العربية' });
	const enLocale = page.getByRole('link', { name: 'English' });
	await enLocale.click();

	await resPromise;

	// check Properties tab is still active
	await expect(tabEn).toHaveAttribute('data-testid', 'active');
});
