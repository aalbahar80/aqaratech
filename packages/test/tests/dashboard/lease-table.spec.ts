import { expect } from '@playwright/test';

import { PageType, getRoute } from '@self/utils';

import { test } from '../api/api-fixtures';

test.describe('lease phase filter', () => {
	test.use({
		leasesParams: [
			{ start: '2030-01-01', end: '2030-12-31' },
			{ start: '2020-01-01', end: '2020-12-31' },
		],
	});

	test.beforeEach(async ({ page, org, leases: _ }) => {
		const url = getRoute({
			entity: 'lease',
			pageType: PageType.List,
			params: {
				organizationId: org.organization.id,
			},
		});

		await page.goto(url);

		// expect 2 items in table
		const table = page.locator('tbody');
		const rows = await table.getByRole('row').count();
		expect(rows).toBe(2);

		const status = page.getByRole('button', { name: 'Status' });
		await status.click();
	});

	test('expired', async ({ page }) => {
		await page.getByText('Expired').click();

		// expect 1 item in table (wait for network)
		await expect(async () => {
			const table = page.locator('tbody');
			const rows2 = await table.getByRole('row').count();
			expect(rows2).toBe(1);
			const row = table.getByRole('row', { name: 'Jan 1, 2020' });
			await expect(row).toBeVisible();
		}).toPass();
	});

	test('upcoming', async ({ page }) => {
		await page.getByText('Upcoming').click();

		// expect 1 item in table (wait for network)
		await expect(async () => {
			const table = page.locator('tbody');
			const rows2 = await table.getByRole('row').count();
			expect(rows2).toBe(1);
			const row = table.getByRole('row', { name: 'Jan 1, 2030' });
			await expect(row).toBeVisible();
		}).toPass();
	});

	test('current', async ({ page }) => {
		await page.getByText('Current').click();

		// expect 1 item in table (wait for network)
		await expect(async () => {
			const table = page.locator('tbody');
			const rows2 = await table.getByRole('row').count();
			expect(rows2).toBe(0);
		}).toPass();
	});
});
