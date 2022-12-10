import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../api/api-fixtures';

test.use({
	invoicesParams: [
		{
			isPaid: false,
			postAt: '2020-01-01',
			dueAt: '2020-01-31',
		},
	],
});

test('can toggle paid status', async ({ page, lease, invoice }) => {
	const url = getRoute({
		entity: 'lease',
		id: lease.id,
		pageType: PageTab.Invoices,
		params: {
			organizationId: lease.organizationId,
			portfolioId: lease.portfolioId,
		},
	});

	await page.goto(url);

	// Past Due badge exists
	await expect.soft(page.getByText('Past due')).toBeVisible();

	// Mark as paid
	const btn = page.getByRole('button', { name: 'Mark as Paid' });
	await btn.click();

	// Payment status badge is updated
	const badge = page.getByTestId(invoice.id).getByTestId('badge');
	await expect(badge).toContainText('Paid');

	// expect button to be disabled
	await expect(btn).toBeDisabled();
});
