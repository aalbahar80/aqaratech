import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../api/api-fixtures';

test.use({
	invoicesParams: [
		// advance
		{
			postAt: Date.UTC(2030, 0, 1),
			dueAt: Date.UTC(2030, 0, 10),
			paidAt: Date.UTC(2029, 11, 14),
			isPaid: true,
		},
		// ontime
		{
			postAt: Date.UTC(2030, 1, 1),
			dueAt: Date.UTC(2030, 1, 10),
			paidAt: Date.UTC(2030, 1, 5),
			isPaid: true,
		},
		// late
		{
			postAt: Date.UTC(2030, 2, 1),
			dueAt: Date.UTC(2030, 2, 10),
			paidAt: Date.UTC(2030, 2, 20),
			isPaid: true,
		},
		// unpaid
		{
			postAt: Date.UTC(2030, 3, 1),
			dueAt: Date.UTC(2030, 3, 30),
			paidAt: null,
			isPaid: false,
		},
	],
});

test('filter on payment time', async ({ page, org, invoices, isMobile }) => {
	const url = getRoute({
		entity: 'lease',
		pageType: PageTab.Invoices,
		id: invoices[0].leaseId,
		params: {
			organizationId: org.organization.id,
			portfolioId: invoices[0].portfolioId,
		},
	});

	await page.goto(url);

	// get the filter
	if (isMobile) {
		await page.getByRole('button', { name: 'Filters' }).click();
	}
	const filter = page.getByRole('button', { name: 'Payment time' });
	await filter.click();

	// select advance
	await page.getByLabel('Advanced').click();
	await expect.soft(page.getByText('Feb 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Apr 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Mar 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Jan 1, 2030')).toBeVisible();

	// select ontime
	await page.getByLabel('On time').click();
	await expect.soft(page.getByText('Jan 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Mar 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Apr 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Feb 1, 2030')).toBeVisible();

	// select late
	await page.getByLabel('Late').click();
	await expect.soft(page.getByText('Jan 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Feb 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Apr 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Mar 1, 2030')).toBeVisible();

	// select all
	await page.getByLabel('All').click();
	await expect.soft(page.getByText('Jan 1, 2030')).toBeVisible();
	await expect.soft(page.getByText('Feb 1, 2030')).toBeVisible();
	await expect.soft(page.getByText('Mar 1, 2030')).toBeVisible();
	await expect.soft(page.getByText('Apr 1, 2030')).toBeVisible();
});
