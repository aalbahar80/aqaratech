import { expect } from '@playwright/test';
import { getRoute, PageType } from '@self/utils';
import { test } from '../api/api-fixtures';

test.use({
	invoiceParams: {
		isPaid: false,
	},
});

test('can toggle paid status', async ({ page, lease, invoice }) => {
	const url = getRoute({
		entity: 'lease',
		id: lease.id,
		pageType: PageType.Id,
		params: {
			organizationId: lease.organizationId,
			portfolioId: lease.portfolioId,
		},
	});

	await page.goto(url + '/invoices');

	const card = page.locator(`data-testid=${invoice.id}`);

	const badgeDue = card.locator('text=Due');

	// Due badge exists
	await expect.soft(badgeDue).toBeVisible();

	// Mark as paid
	const menu = card.locator('data-testid=dropdown-menu');
	await menu.click();
	await card.locator('button:has-text("Mark as paid")').click();

	// Paid badge exists
	await expect.soft(card.locator('#badge >> text=Paid')).toBeVisible();

	// Mark as unpaid
	await menu.click();
	await card.locator('button:has-text("Mark as unpaid")').click();

	// Due badge exists
	await expect.soft(badgeDue).toBeVisible();
});
