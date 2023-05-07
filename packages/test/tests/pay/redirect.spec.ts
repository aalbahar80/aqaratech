import { expect } from '@playwright/test';

import { PageType, getMyfatoorahReceipt, getRoute } from '@self/utils';

import { getdb } from '../../utils/leveldb';
import { test } from '../api/api-fixtures';
import { apiURL } from '../api/fixtures/api-url';
import { siteURL } from '../api/fixtures/site-url';

test.describe('logged in: myfatoorah callback', () => {
	test.use({ userRoleType: 'TENANT', invoicesParams: [{ isPaid: false }] });

	test('redirects to our domain if logged in', async ({ request, invoice }) => {
		getdb().set(invoice.id, {
			isPaid: true,
			paymentId: invoice.id,
			leaseInvoiceId: invoice.id,
			json: {
				CustomerReference: invoice.id,
				// UserDefinedField: invoice.organizationId,
			},
		});

		const url = `${apiURL}/leaseInvoices/myfatoorah-callback?paymentId=${invoice.id}`;

		const res = await request.get(url, {
			maxRedirects: 0,
		});

		expect(res.status()).toBe(302);

		const redirectTo = getRoute({
			entity: 'leaseInvoice',
			pageType: PageType.Id,
			id: invoice.id,
			params: {
				organizationId: invoice.organizationId,
				portfolioId: invoice.portfolioId,
			},
		});

		expect(res.headers()['location']).toBe(`${siteURL}${redirectTo}`);
	});
});

test.describe('failed payment', () => {
	test.use({ userRoleType: 'TENANT', invoicesParams: [{ isPaid: false }] });

	test('redirects to myfatoorah receipt', async ({ request, invoice }) => {
		getdb().set(invoice.id, {
			isPaid: false,
			paymentId: invoice.id,
			leaseInvoiceId: invoice.id,
			json: {
				CustomerReference: invoice.id,
				// UserDefinedField: invoice.organizationId,
			},
		});

		const url = `${apiURL}/leaseInvoices/myfatoorah-callback?paymentId=${invoice.id}`;

		const res = await request.get(url, {
			maxRedirects: 0,
		});

		expect(res.status()).toBe(302);

		const redirectTo = getMyfatoorahReceipt({
			paymentId: invoice.id,
			myfatoorahURL: process.env.PUBLIC_MYFATOORAH_SITE_URL,
		});

		expect(res.headers()['location']).toBe(redirectTo);
	});
});

test.describe('not logged in: myfatoorah callback', () => {
	test.use({
		storageState: { cookies: [], origins: [] },
		invoicesParams: [{ isPaid: false }],
	});

	test('redirects to myfatoorah receipt', async ({ request, invoice }) => {
		getdb().set(invoice.id, {
			isPaid: true,
			paymentId: invoice.id,
			leaseInvoiceId: invoice.id,
			json: {
				CustomerReference: invoice.id,
				// UserDefinedField: invoice.organizationId,
			},
		});

		const url = `${apiURL}/leaseInvoices/myfatoorah-callback?paymentId=${invoice.id}`;

		const res = await request.get(url, {
			maxRedirects: 0,
		});

		expect(res.status()).toBe(302);

		const route = `/en/public/leaseInvoices/${invoice.id}`;
		expect(res.headers()['location']).toBe(`${siteURL}${route}`);
	});
});
