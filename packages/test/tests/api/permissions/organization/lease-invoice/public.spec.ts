import { expect } from '@playwright/test';

import { test } from '../../../api-fixtures';
import { apiURL } from '../../../fixtures/api-url';

test.use({ storageState: { cookies: [], origins: [] } });

test('data exposed in public invoice page', async ({ request, invoice }) => {
	const url = apiURL + `/leaseInvoices/${invoice.id}/public`;

	const res = await request.get(url);

	expect(res.status()).toBe(200);

	const data = (await res.json()) as Record<string, unknown>;

	// check that only those fields are exposed
	expect(Object.keys(data)).toStrictEqual([
		'id',
		'amount',
		'isPaid',
		'postAt',
		'paidAt',
		'memo',
	]);
});
