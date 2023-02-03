import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test } from '../../api/api-fixtures';

// Test is failing ever since we added mfPaymentId to details pane
test.fixme(
	'screenshot smoke test',
	async ({ page, org, portfolio, invoice }) => {
		const url = getRoute({
			entity: 'leaseInvoice',
			pageType: PageType.Id,
			id: invoice.id,
			params: {
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
			},
		});

		await page.goto(url);

		const original = await page.getByTestId('details-pane').screenshot();

		await page.getByRole('link', { name: 'Edit' }).click();

		const edit = getRoute({
			entity: 'leaseInvoice',
			pageType: PageType.Edit,
			id: invoice.id,
			params: {
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
			},
		});

		await expect(page).toHaveURL(edit);

		await page.locator('text=Save').click();

		// ensure same entity
		await expect(page).toHaveURL(url);

		const latest = await page.getByTestId('details-pane').screenshot();

		const isSame = original.toString() === latest.toString();

		expect(isSame, 'screenshots should be the same').toBe(true);
	},
);
