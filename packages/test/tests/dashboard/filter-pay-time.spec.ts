import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../api/api-fixtures';

const RECENT_DATE = Date.now() - 5 * 24 * 3600 * 1000; // 5 days ago

test.use({
	invoicesParams: [
		// advance
		{
			postAt: Date.UTC(2030, 0, 1),
			paidAt: Date.UTC(2029, 11, 14),
			isPaid: true,
		},
		// ontime
		{
			postAt: Date.UTC(2030, 1, 1),
			paidAt: Date.UTC(2030, 1, 5),
			isPaid: true,
		},
		// late (default dueDuration is 30 days)
		{
			postAt: Date.UTC(2030, 2, 1),
			paidAt: Date.UTC(2030, 3, 20),
			isPaid: true,
		},
		// not due
		{
			postAt: Date.UTC(2030, 3, 1),
			paidAt: null,
			isPaid: false,
		},
		// due
		{
			postAt: RECENT_DATE,
			paidAt: null,
			isPaid: false,
		},
		// past due
		{
			postAt: Date.UTC(2020, 5, 1),
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

	// RECENT_DATE as 'mmm d, yyyy'
	const RECENT = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'medium',
	}).format(RECENT_DATE);

	// select advance
	await page.getByLabel('Advanced').click();
	await expect.soft(page.getByText('Feb 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Mar 1, 2030')).toBeHidden();
	await expect.soft(page.getByText(RECENT)).toBeHidden();
	await expect.soft(page.getByText('June 1, 2020')).toBeHidden();
	await expect.soft(page.getByText('Jan 1, 2030')).toBeVisible();
	await expect.soft(page.getByText('Apr 1, 2030')).toBeVisible();

	// select ontime
	await page.getByLabel('On time').click();
	await expect.soft(page.getByText('Jan 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Mar 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Apr 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('June 1, 2020')).toBeHidden();
	await expect.soft(page.getByText(RECENT)).toBeVisible();
	await expect.soft(page.getByText('Feb 1, 2030')).toBeVisible();

	// select late
	await page.getByLabel('Late').click();
	await expect.soft(page.getByText('Jan 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Feb 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('Apr 1, 2030')).toBeHidden();
	await expect.soft(page.getByText('June 1, 2020')).toBeHidden();
	await expect.soft(page.getByText(RECENT)).toBeHidden();
	await expect.soft(page.getByText('Mar 1, 2030')).toBeVisible();

	// select all
	await page.getByLabel('All').click();
	await expect.soft(page.getByText('Jan 1, 2030')).toBeVisible();
	await expect.soft(page.getByText('Feb 1, 2030')).toBeVisible();
	await expect.soft(page.getByText('Mar 1, 2030')).toBeVisible();
	await expect.soft(page.getByText('Apr 1, 2030')).toBeVisible();
	await expect.soft(page.getByText('Jun 1, 2020')).toBeVisible();
	await expect.soft(page.getByText(RECENT)).toBeVisible();
});
