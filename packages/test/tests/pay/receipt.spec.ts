import { expect } from '@playwright/test';

import { test } from '../api/api-fixtures';
import { siteURL } from '../api/fixtures/site-url';

test.describe('Paid invoice', () => {
	test.use({
		storageState: { cookies: [], origins: [] },
		invoicesParams: [{ isPaid: true }],
	});
	test('has success message', async ({ invoice, page }) => {
		const route = `/en/public/leaseInvoices/${invoice.id}`;
		const url = siteURL + route;

		await page.goto(url);

		const m = page.getByTestId('invoice-success-message');
		await expect(m).toBeInViewport();

		const m2 = page.getByTestId('tenant-login-message');
		await expect(m2).toBeVisible();
	});
});

test.describe('Unpaid invoice', () => {
	test.use({
		userRoleType: 'TENANT',
		invoicesParams: [{ isPaid: false }],
	});
	test('does not have success message', async ({ invoice, page }) => {
		const route = `/en/public/leaseInvoices/${invoice.id}`;
		const url = siteURL + route;

		await page.goto(url);

		const m = page.getByTestId('invoice-success-message');
		await expect(m).toBeHidden();

		// we're logged in, so we should not see the login message
		const m2 = page.getByTestId('tenant-login-message');
		await expect(m2).toBeHidden();
	});
});
