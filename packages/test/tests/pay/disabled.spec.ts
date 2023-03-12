import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test } from '../api/api-fixtures';
import { apiURL } from '../api/fixtures/api-url';

test.describe('paid rent', () => {
	test.use({
		userRoleType: 'TENANT',
		leasesParams: [{ canPay: true }],
		invoicesParams: [{ isPaid: true }],
	});

	test('pay button is disabled in invoice page', async ({
		page,
		org,
		invoice,
	}) => {
		const url = getRoute({
			entity: 'leaseInvoice',
			pageType: PageType.Id,
			id: invoice.id,
			params: {
				organizationId: org.organization.id,
				portfolioId: invoice.portfolioId,
			},
		});

		await page.goto(url);

		const badge = page.getByTestId('badge');
		await expect(badge).toHaveText('Paid');

		// Check that the pay button is disabled
		const pay = page.locator('a', { hasText: 'Pay' });

		await expect(pay).toBeVisible();
		expect(await pay.getAttribute('href')).toBeNull();
	});

	test('pay button is disabled in table', async ({
		page,
		org,
		invoice: _invoice,
		tenant,
	}) => {
		const url = getRoute({
			entity: 'leaseInvoice',
			pageType: PageType.List,
			params: {
				organizationId: org.organization.id,
				tenantId: tenant.id,
			},
		});

		await page.goto(url);

		// Check that the pay button is disabled
		const pay = page.getByText('Pay', { exact: true });

		await expect(pay).toBeVisible();
		expect(await pay.getAttribute('href')).toBeNull();
	});

	test('does not generate pay link', async ({ request, invoice }) => {
		const url = `${apiURL}/leaseInvoices/${invoice.id}/pay`;

		const res = await request.get(url);

		expect(res.status()).toBe(400);
		expect(await res.json()).toHaveProperty(
			'message',
			'Invoice is already paid',
		);
	});
});

test.describe('lease with disabled payments', () => {
	test.use({
		userRoleType: 'TENANT',
		leasesParams: [{ canPay: false }],
		invoicesParams: [{ isPaid: false }],
	});

	test('does not generate pay link', async ({ request, invoice }) => {
		const url = `${apiURL}/leaseInvoices/${invoice.id}/pay`;

		const res = await request.get(url);

		expect(res.status()).toBe(400);
		expect(await res.json()).toHaveProperty(
			'message',
			'Online payments are disabled for this lease',
		);
	});
});
