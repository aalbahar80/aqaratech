import { expect } from '@playwright/test';

import { getRoute, PageTab } from '@self/utils';

import { test } from '../api/api-fixtures';

test.describe('invoice due sms', () => {
	test.use({
		tenantsParams: [{ phone: '12384687' }],
		leasesParams: [{ canPay: true }],
		invoicesParams: [{ isPaid: false }],
	});

	test('can be sent manually', async ({ page, tenant: _, invoice }) => {
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
});

test.describe('lease.canPay set to false', () => {
	test.use({
		tenantsParams: [{ phone: '12384687' }],
		leasesParams: [{ canPay: false }],
		invoicesParams: [{ isPaid: false }],
	});

	test('it doesnt allow manual reminders', async ({
		page,
		tenant: _,
		invoice,
	}) => {
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

		expect(response.status()).toBe(400);

		const message = page.getByText(
			'Online payments are disabled for this lease',
		);
		await expect.soft(message).toBeVisible();

		expect(await response.json()).toHaveProperty(
			'message',
			'Online payments are disabled for this lease',
		);
	});
});

test.describe('paid invoice', () => {
	test.use({
		leasesParams: [{ canPay: true }],
		invoicesParams: [{ isPaid: true }],
	});

	test('it doesnt allow manual reminders', async ({
		page,
		tenant: _,
		invoice,
	}) => {
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

		expect(response.status()).toBe(400);

		const message = page.getByText('Invoice is already paid');
		await expect.soft(message).toBeVisible();

		expect(await response.json()).toHaveProperty(
			'message',
			'Invoice is already paid',
		);
	});
});

test.describe('no tenant phone number', () => {
	test.use({
		tenantsParams: [{ phone: null }],
		leasesParams: [{ canPay: true }],
		invoicesParams: [{ isPaid: false }],
	});

	test('it doesnt allow manual reminders', async ({
		page,
		tenant: _,
		invoice,
	}) => {
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

		expect(response.status()).toBe(400);

		const messageText = 'No emails or phone number found for tenant';
		const message = page.getByText(messageText);
		await expect.soft(message).toBeVisible();

		expect(await response.json()).toHaveProperty('message', messageText);
	});
});
