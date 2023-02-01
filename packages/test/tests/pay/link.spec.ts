import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test } from '../api/api-fixtures';

test.describe('paid rent', () => {
	test.use({
		userRoleType: 'TENANT',
		leasesParams: [{ canPay: true }],
		invoicesParams: [{ isPaid: false, postAt: '2020-01-01' }],
	});

	test('pay link attributes', async ({
		scopedPage: page,
		org,
		invoice,
		tenant,
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
			page.waitForRequest((request) => {
				return request.url().includes('stubbed-myfatoorah');
			}),
			pay.click(),
		]);

		// console.log(request.url());
		expect(request.url()).toBeDefined();

		// verify search params
		const searchParams = new URL(request.url()).searchParams;
		expect.soft(searchParams.get('amount')).toBe(invoice.amount.toString());
		expect.soft(searchParams.get('invoiceId')).toBe(invoice.id);
		expect.soft(searchParams.get('name')).toBe(tenant.fullName);
		expect
			.soft(searchParams.get('organizationId'))
			.toBe(invoice.organizationId);

		// expect.soft(searchParams.get('redirectTo')).toBe(url);
	});
});
