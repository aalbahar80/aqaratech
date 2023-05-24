import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { getdb } from '../../utils/leveldb';
import { test } from '../api/api-fixtures';
import { apiURL } from '../api/fixtures/api-url';

test.use({
	userRoleType: 'TENANT',
	leasesParams: [{ canPay: true }],
	invoicesParams: [{ isPaid: false, postAt: '2020-01-01' }],
	video: 'retain-on-failure',
	trace: 'retain-on-failure',
});

test.describe('unpaid rent', () => {
	test('pay button redirects to pay endpoint', async ({
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

		const pay = page.getByRole('link', { name: 'Pay' });

		const [request] = await Promise.all([
			page.waitForRequest((request) => request.url().endsWith('/pay')),
			pay.click(),
		]);

		expect(request.url()).toBeDefined();
	});

	// This test assumes that the myfatoorah stub is running.
	// It's a workaround for flaking tests due to external payment gateway.
	// Consider unit testing the payment gateway integration instead in /backend.
	test('can be paid once - stubbed', async ({ page, org, invoice }) => {
		test.slow();

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

		// TODO: test type
		getdb().set(invoice.id, {
			isPaid: true,
			paymentId: invoice.id,
			leaseInvoiceId: invoice.id,
			json: {
				CustomerReference: invoice.id,
				// UserDefinedField: invoice.organizationId,
			},
		});

		// Intercept the request to myfatoorah with a 302 redirect to the invoice page
		// myfatoorah stub will use the `paymentId` as both `paymentId` and `CustomerReference`
		await page.route('**/pay', async (route) => {
			const redirectTo = `${apiURL}/leaseInvoices/myfatoorah-callback?paymentId=${invoice.id}`;
			return await route.fulfill({
				status: 302,
				headers: {
					location: redirectTo,
				},
			});
		});

		await page.getByRole('link', { name: 'Pay' }).click();

		const badge = page.getByTestId('badge');

		await expect(badge).toHaveText('Paid');

		// Check that the pay button is disabled
		const pay = page.locator('a', { hasText: 'Pay' });

		await expect(pay).toBeVisible();
		expect(await pay.getAttribute('href')).toBeNull();
	});

	// This test is flaky because of the external payment gateway.
	test.fixme('can be paid once - actual', async ({ page, org, invoice }) => {
		test.slow();

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

		const pay = page.getByRole('link', { name: 'Pay' });

		await pay.click();

		await page
			.getByRole('combobox')
			.first()
			.selectOption('201825717889145|Knet Test Card [KNET1]|0.000');

		await page.waitForTimeout(1000); // Otherwise the next input fill is flaky

		await page
			.getByTitle('Should be in number. Length should be 10')
			.fill('0000000001');

		await page.getByRole('combobox').nth(2).selectOption('9');

		await page.getByRole('combobox').nth(3).selectOption('2025');

		await page
			.getByRole('textbox', { name: 'Should be in number. Length should be 4' })
			.fill('1234');

		await page.getByRole('button', { name: 'Submit' }).click();
		await page.getByRole('button', { name: 'Confirm' }).click();

		const badge = page.getByTestId('badge');

		await expect(badge).toHaveText('Paid');
		await expect(page.getByRole('button', { name: 'Pay' })).toBeDisabled();
	});
});
