import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { test as base } from '../api/api-fixtures';
import { IdPage } from '../models/id-page';

const test = base.extend({
	page: async ({ page, org }, use) => {
		const url = getRoute({
			entity: 'organization',
			id: org.organization.id,
			pageType: PageType.Id,
			params: {},
		});

		await page.goto(url);

		const idPage = new IdPage({ page });

		const remove = page.getByRole('button', { name: 'Delete' });

		await idPage.expandOptions(remove);

		await remove.click();

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

	// eslint-disable-next-line playwright/no-force-option
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
