import { expect, Page } from '@playwright/test';
import { sample } from '@self/seed';
import { test as base } from '../config';

const org = sample.organizations[0];

const test = base.extend<MyFixtures>({
	page: async ({ page }, use) => {
		await page.goto(`/organizations/${org.id}/settings/organization`);
		await page.locator(`data-testid=more-actions-button`).click();
		await page.locator('button:has-text("Delete")').click();
		await use(page);
	},
});

test('delete button is disabled by default', async ({ page }) => {
	const btn = page.locator(`data-testid=confirm`);
	await expect(btn).toBeDisabled();
});

test('delete button is not responsive', async ({ page }) => {
	const btn = page.locator(`data-testid=confirm`);
	await btn.click({ force: true });

	// wait 2 seconds
	await page.waitForLoadState('networkidle', { timeout: 2000 });

	// test that the modal is still open
	await expect(page.locator(`data-testid=confirm`)).toBeDisabled();
});

test('filling prompt with incorrect text does not enable button', async ({
	page,
}) => {
	const input = page.locator(`input[placeholder="${org.fullName}"]`);
	await input.fill('wrong');
	const btn = page.locator(`data-testid=confirm`);
	await expect(btn).toBeDisabled();
});

test('filling prompt with correct text enables button', async ({ page }) => {
	const input = page.locator(`input[placeholder="${org.fullName}"]`);
	await input.fill(org.fullName);
	const btn = page.locator(`data-testid=confirm`);
	await expect(btn).toBeEnabled();
});

type MyFixtures = {
	page: Page;
};
