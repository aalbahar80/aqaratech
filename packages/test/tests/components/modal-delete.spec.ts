import { expect } from '@playwright/test';
import { getRoute, PageType } from '@self/utils';
import { test as base } from '../api/api-fixtures';

const test = base.extend({
	page: async ({ page, org }, use) => {
		const url = getRoute({
			entity: 'organization',
			id: org.organization.id,
			pageType: PageType.Id,
			params: {},
		});

		await page.goto(url);

		await page.locator(`data-testid=more-actions-button`).click();

		await page.locator('button:has-text("Delete")').click();

		await use(page);
	},
});

test('delete button is disabled by default', async ({ page }) => {
	const modal = page.getByTestId('modal');
	const btn = modal.getByRole('button', { name: 'Delete' });

	await expect(btn).toBeDisabled();
});

test('delete button is not responsive', async ({ page }) => {
	const modal = page.getByTestId('modal');
	const btn = modal.getByRole('button', { name: 'Delete' });

	await btn.click({ force: true });

	// wait 2 seconds
	await page.waitForLoadState('networkidle', { timeout: 2000 });

	// test that the modal is still open
	await expect(btn).toBeDisabled();
});

test('filling prompt with incorrect text does not enable button', async ({
	page,
	org,
}) => {
	const input = page.locator(
		`input[placeholder="${org.organization.fullName}"]`,
	);

	await input.fill('wrong');

	const modal = page.getByTestId('modal');
	const btn = modal.getByRole('button', { name: 'Delete' });

	await expect(btn).toBeDisabled();
});

test('filling prompt with correct text enables button', async ({
	page,
	org,
}) => {
	const input = page.locator(
		`input[placeholder="${org.organization.fullName}"]`,
	);

	await input.fill(org.organization.fullName);

	const modal = page.getByTestId('modal');
	const btn = modal.getByRole('button', { name: 'Delete' });

	await expect(btn).toBeEnabled();
});
