import { expect, Page } from '@playwright/test';
import { sample, testOrgRoleId } from '@self/seed';
import { test as base } from '../config';

const lease = sample.leases[0];

const test = base.extend<MyFixtures>({
	invoice: async ({ page, request, token, apiBaseURL }, use) => {
		await page.goto(`leases/${lease.id}`);

		const data: Omit<Invoice, 'id'> = {
			organizationId: lease.organizationId,
			portfolioId: lease.portfolioId,
			leaseId: lease.id,
			amount: lease.monthlyRent,
			postAt: new Date(),
			// due tomorrow
			dueAt: new Date(new Date().setDate(new Date().getDate() + 1)),
			isPaid: false,
		};

		const res = await request.post(`${apiBaseURL}/leaseInvoices`, {
			data,
			headers: {
				authorization: `Bearer ${token}`,
				'x-role-id': testOrgRoleId,
			},
		});
		const invoice = (await res.json()) as Invoice;
		await use(invoice);
	},
});

test('can toggle paid status', async ({ page, invoice }) => {
	await page.goto(`leases/${lease.id}`);
	const card = page.locator(`data-testid=${invoice.id}`);
	const badgeDue = card.locator('text=Due');

	// Due badge exists
	await expect.soft(badgeDue).toBeVisible();

	// Mark as paid
	const menu = card.locator('data-testid=dropdown-menu');
	await menu.click();
	await card.locator('button:has-text("Mark as paid")').click();

	// Paid badge exists
	await expect.soft(card.locator('#badge >> text=Paid')).toBeVisible();

	// Mark as unpaid
	await menu.click();
	await card.locator('button:has-text("Mark as unpaid")').click();

	// Due badge exists
	await expect.soft(badgeDue).toBeVisible();
});

type Invoice = typeof sample.leaseInvoices[number];

type MyFixtures = {
	page: Page;
	invoice: Invoice;
};
