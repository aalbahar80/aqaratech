import { expect, Page } from "@playwright/test";
import { sample, testOrgRoleId } from "@self/seed";
import { test as base } from "../config";

const lease = sample.leases[0];

const test = base.extend<MyFixtures>({
	invoice: async ({ page, request, token }, use) => {
		await page.goto(`leases/${lease.id}`);

		const data: Omit<Invoice, "id"> = {
			organizationId: lease.organizationId,
			portfolioId: lease.portfolioId,
			leaseId: lease.id,
			amount: lease.monthlyRent,
			postAt: new Date(),
			// due tomorrow
			dueAt: new Date(new Date().setDate(new Date().getDate() + 1)),
			isPaid: false,
		};

		const res = await request.post("http://localhost:3002/leaseInvoices", {
			data,
			headers: {
				authorization: `Bearer ${token}`,
				"x-role-id": testOrgRoleId,
			},
		});
		const invoice = (await res.json()) as Invoice;
		await use(invoice);
	},
});

test("can toggle paid status", async ({ page, invoice }) => {
	await page.goto(`leases/${lease.id}`);
	const card = page.locator(`data-testid=${invoice.id}`);

	// Due badge exists
	expect.soft(card.locator("text=Due")).toBeVisible();

	const btn = card.locator("data-testid=dropdown-menu");
	await btn.click();
	const toggle = card.locator('button:has-text("Mark as paid")');
	await toggle.click();
});

type Invoice = typeof sample.leaseInvoices[number];

type MyFixtures = {
	page: Page;
	invoice: Invoice;
};
