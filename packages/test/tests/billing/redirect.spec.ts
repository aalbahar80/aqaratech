import { expect } from '@playwright/test';

import { testOrgUserId } from '@self/seed';
import { getRoute, PageTab, PageType } from '@self/utils';

import { test } from '../api/api-fixtures';
import { siteURL } from '../api/fixtures/site-url';

test.slow();

test.describe.configure({ mode: 'parallel' });

test.describe('redirect for non-active subscriptions- ORGADMIN', () => {
	test.use({ organizationParams: { isActive: false } });
	test('redirected to billing page to re-subscribe', async ({
		request,
		org,
	}) => {
		const url = getRoute({
			entity: 'portfolio',
			pageType: PageType.List,
			params: { organizationId: org.organization.id },
		});

		const res = await request.get(url, { maxRedirects: 0 });

		expect(res.status()).toBe(302);

		const route = getRoute({
			entity: 'organization',
			pageType: PageTab.Billing,
			id: org.organization.id,
			params: {
				organizationId: org.organization.id,
			},
		});

		expect(res.headers()['location']).toBe(route);
	});

	test('can still create new organization', async ({ page, isMobile }) => {
		test.setTimeout(90000); // slow call to site/org/:id/billing

		await page.goto(`${siteURL}/concierge`);
		if (isMobile) {
			await page.getByRole('button', { name: 'Sidebar' }).click();
		}

		await page.getByRole('link', { name: 'Account' }).click();
		await page.getByRole('link', { name: '+ New Organization' }).click();

		// expect to see the create organization form, not redirected to billing page
		await expect(page).toHaveURL(/\/organizations\/new/);
	});

	const routes = [
		[`/en/users/${testOrgUserId}/roles`, 'User Roles'],
		['/en/welcome', 'Welcome'],
		['/en/organizations/new', 'Create Organization'],
	] as const;

	for (const route of routes) {
		test(`can access ${route[1]} page`, async ({ page }) => {
			const resPromise = page.waitForResponse(
				(res) => new URL(res.url()).pathname === route[0],
			);

			await page.goto(route[0]);

			const res = await resPromise;

			expect.soft(res.status()).toBe(200);
		});
	}
});

const message =
	'This organization does not have an active subscription. Please contact your administrator.';

test.describe('redirect for non-active subscriptions - PORTFOLIO', () => {
	test.use({
		userRoleType: 'PORTFOLIO',
		waitForHydration: false,
		organizationParams: { isActive: false },
	});

	test('prompted to contact admin', async ({ page, org, portfolio }) => {
		const url = getRoute({
			entity: 'property',
			pageType: PageType.List,
			params: {
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
			},
		});

		await page.goto(url);

		await expect(page.getByText(message)).toBeVisible();
	});
});

test.describe('redirect for non-active subscriptions - TENANT', () => {
	test.use({
		userRoleType: 'TENANT',
		waitForHydration: false,
		organizationParams: { isActive: false },
	});

	test('prompted to contact admin', async ({ page, org, invoice }) => {
		const url = getRoute({
			entity: 'leaseInvoice',
			pageType: PageType.Id,
			id: invoice.id,
			params: {
				organizationId: org.organization.id,
				portfolioId: invoice.portfolioId,
			},
		});

		await page.goto(url);

		await expect(page.getByText(message)).toBeVisible();
	});
});
