import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test } from '../api/api-fixtures';

test.use({
	locale: 'en-US',
	timezoneId: 'America/Los_Angeles',
	invoicesParams: [
		{
			postAt: Date.UTC(2023, 0, 1),
			dueAt: Date.UTC(2023, 0, 31),
			paidAt: Date.UTC(2023, 0, 15),
			isPaid: true,
		},
	],
});

test('dates in utc', async ({ page, org, invoices }) => {
	const url = getRoute({
		entity: 'leaseInvoice',
		pageType: PageType.Id,
		id: invoices[0].id,
		params: {
			organizationId: org.organization.id,
			portfolioId: invoices[0].portfolioId,
		},
	});

	await page.goto(url);

	await expect(page.getByText('Jan 1, 2023')).toBeVisible();
	await expect(page.getByText('Jan 31, 2023')).toBeVisible();
	await expect(page.getByText('Jan 15, 2023')).toBeVisible();
});
