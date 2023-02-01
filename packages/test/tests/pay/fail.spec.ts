import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { getdb } from '../../utils/leveldb';
import { test } from '../api/api-fixtures';
import { apiURL } from '../api/fixtures/api-url';

test.describe('paid rent', () => {
	test.use({
		userRoleType: 'TENANT',
		leasesParams: [{ canPay: true }],
		invoicesParams: [{ isPaid: false, postAt: '2020-01-01' }],
	});

	test('failed payment', async ({ scopedPage: page, org, invoice }) => {
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

		const paymentId = Math.random().toString(12).substring(6);

		// stub myfatoorah callback with failed payment
		// TODO: test type
		getdb().set(paymentId, {
			isPaid: false,
			paymentId: paymentId,
			leaseInvoiceId: invoice.id,
			json: {
				CustomerReference: invoice.id,
				// UserDefinedField: invoice.organizationId,
			},
		});

		const pay = page.getByRole('link', { name: 'Pay' });

		// Intercept the request to myfatoorah with a 302 redirect to the invoice page
		// myfatoorah stub will use the `paymentId` as both `paymentId` and `CustomerReference`
		await page.route('**/pay', async (route) => {
			const redirectTo = `${apiURL}/leaseInvoices/myfatoorah-callback?paymentId=${paymentId}`;
			return await route.fulfill({
				status: 302,
				headers: {
					location: redirectTo,
				},
			});
		});

		await pay.click();

		// assert that payment is still marked as unpaid
		await expect.soft(page.getByText('Past due')).toBeVisible();
		await expect.soft(pay).toBeVisible();
	});
});
