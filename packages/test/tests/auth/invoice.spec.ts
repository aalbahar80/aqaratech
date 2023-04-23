import { expect } from '@playwright/test';

import { test } from '../api/api-fixtures';
import { siteURL } from '../api/fixtures/site-url';

test.use({ storageState: { cookies: [], origins: [] } });

test('public invoice page does not redirect to login', async ({
	invoice,
	request,
}) => {
	const route = `/en/public/leaseInvoices/${invoice.id}`;
	const url = siteURL + route;

	const res = await request.get(url, { maxRedirects: 0 });

	expect.soft(res.status()).toBe(200);
});
