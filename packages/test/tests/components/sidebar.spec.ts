import { devices, expect } from '@playwright/test';
import { getRoute, PageTypePortfolio } from '@self/utils';
import { test } from '../api/api-fixtures';
import { SidebarModel } from './sidebar/sidebar-model';

test.use({
	...devices['iPhone 13 Mini'],
	// Avoid using webkit if cookies are involved
	// https://github.com/microsoft/playwright/blob/31d45ad4dc87604bcd5cd3e3d6c0b9c23bbdab60/packages/playwright-core/src/server/deviceDescriptorsSource.json#L786
	defaultBrowserType: 'chromium',
	page: async ({ page, org, portfolio }, use) => {
		const url = getRoute({
			entity: 'portfolio',
			id: portfolio.id,
			pageType: PageTypePortfolio.Income,
			params: {
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
			},
		});

		await page.goto(url);

		await use(page);
	},
});

test('sidebar can be opened and closed', async ({ page }) => {
	const sidebar = new SidebarModel(page);

	const closed = page.getByRole('button', { name: 'Sidebar', expanded: false });
	await expect(closed).toBeVisible();

	await sidebar.toggle.click();

	await sidebar.assertOpen();

	const logout = page.getByRole('link', { name: 'Logout' });
	await expect(logout).toBeVisible();

	// Close sidebar
	await sidebar.toggle.click();

	await sidebar.assertClosed();
});

test('clicking outside of sidebar closes it', async ({ page }) => {
	const sidebar = new SidebarModel(page);

	await sidebar.open();

	// Click outside of sidebar
	await page.click('body', { position: { x: 0, y: 0 } });

	await sidebar.assertClosed();
});

test('navigating closes sidebar', async ({ page }) => {
	const sidebar = new SidebarModel(page);

	await sidebar.open();

	await page.getByRole('link', { name: 'Account' }).click();

	await sidebar.assertClosed();
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.fixme('sidebar is hidden on mobile', async ({}) => {});

test.fixme('sidebar is hidden by default - homepage', async ({ page }) => {
	await page.goto('/');

	// Check that the sidebar is hidden
});
