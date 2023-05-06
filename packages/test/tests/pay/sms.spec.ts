import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../api/api-fixtures';

test.use({
	tenantsParams: [{ phone: '12384687' }],
	invoicesParams: [{ isPaid: false }],
});

test('invoice due sms', async ({ page, tenant: _, invoice }) => {
	const url = getRoute({
		entity: 'leaseInvoice',
		id: invoice.id,
		pageType: PageTab.Messages,
		params: {
			organizationId: invoice.organizationId,
			portfolioId: invoice.portfolioId,
		},
	});

	await page.goto(url);

	const send = page.getByRole('button', { name: 'Send reminder' });

	const responsePromise = page.waitForResponse((res) =>
		res.url().includes('notify'),
	);

	await send.click();

	const response = await responsePromise;

	expect(response.status()).toBe(201);

	const body = (await response.json()) as string[];

	// check email was sent
	expect.soft(body).toHaveLength(1);
	expect.soft(body).toStrictEqual(['12384687']);
});
