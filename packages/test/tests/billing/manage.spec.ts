import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../api/api-fixtures';

test.use({ organizationParams: { isActive: true } });

test.slow();
// Stripe billing portal includes updating payment method + viewing invoices
test('can manage subscription', async ({ page, org }) => {
	const url = getRoute({
		entity: 'organization',
		pageType: PageTab.Billing,
		id: org.organization.id,
		params: {
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	await page.getByRole('button', { name: 'Subscription settings' }).click();

	// expect to be on the stripe billing portal
	await expect(page).toHaveURL(/billing\.aqaratech\.com/, {
		timeout: 10000,
	});

	const invoices = page.getByText('Invoice history', { exact: true });
	await expect.soft(invoices).toBeVisible();

	const payment = page.getByRole('link', { name: 'Add payment method' });
	await expect.soft(payment).toBeVisible();
});
