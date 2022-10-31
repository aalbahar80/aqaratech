import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { test } from '../../api/api-fixtures';

const lease = sample.leases[0];
test('smoke', async ({ page }, info) => {
	await page.goto(`/leaseInvoices/new?leaseId=${lease.id}`);

	await page.locator('#amount').fill('500');
	await page.locator('#postAt').fill('2020-01-01');
	await page.locator('#dueAt').fill('2020-01-05');

	await page.locator('text=Save').click();

	const id = new RegExp(
		`/leaseInvoices/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
	);
	await expect(page).toHaveURL(id);
	const url = page.url();

	// take screenshot
	expect(page.locator('text=leaseInvoice')).toBeTruthy();
	await page.locator('#detailsPane').screenshot({
		path:
			info.snapshotDir +
			`/leaseInvoice-${info.snapshotSuffix}-${info.project.name}.png`,
	});

	await page.locator('text=Edit').click();
	const edit = new RegExp(
		`/leaseInvoices/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/edit`,
	);
	await expect(page).toHaveURL(edit);
	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	// match screenshot
	expect(page.locator('text=leaseInvoice')).toBeTruthy();
	expect(await page.locator('#detailsPane').screenshot()).toMatchSnapshot({
		name: 'leaseInvoice.png',
	});
});
