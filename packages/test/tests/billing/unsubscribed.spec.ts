import { expect } from '@playwright/test';
import tier from 'tier';

import { testOrgUserId } from '@self/seed';
import { getRoute, PageTab, PageType, tierid } from '@self/utils';

import { test } from '../api/api-fixtures';
import { plan } from '../api/fixtures/env';
import { siteURL } from '../api/fixtures/site-url';

test.describe('unsubscribed', () => {
	test.use({ organizationParams: { isActive: false } });

	test.beforeEach(async ({ org }) => {
		// sub then unsub to ensure we're in the right state
		await tier.subscribe(tierid(org.organization.id), plan);
		await tier.cancel(tierid(org.organization.id));
	});

	test('can subscribe', async ({ page, org }) => {
		const url = getRoute({
			entity: 'organization',
			pageType: PageTab.Billing,
			id: org.organization.id,
			params: {
				organizationId: org.organization.id,
			},
		});

		await page.goto(url);

		await page.getByRole('button', { name: 'Subscribe' }).click();

		await expect(page).toHaveURL(/checkout\.stripe\.com/, { timeout: 10000 });
	});

	test('isActive is restored after subscribing', async ({ page, org }) => {
		// use tier.subscribe to simulate the user has subscribed/paid for the subscription
		await tier.subscribe(tierid(org.organization.id), plan);

		// Check that our system handles the status change promptly

		// go to role's home page
		await page.goto(`${siteURL}/concierge`);

		// At first, we should be redirected to the billing page
		// since org.isActive is still false in our db.
		// Then, the billing page's load function will attempt to
		// fetch the latest subscription status from Stripe, and
		// update it in our db if it's different.
		await expect.soft(page).toHaveURL(/\/billing/);

		// expect to see the cancel subscription button
		const cancel = page.getByRole('button', { name: 'Cancel subscription' });

		await expect.soft(cancel).toBeVisible();
	});
});

test.describe('redirect for non-active subscriptions- ORGADMIN', () => {
	test.use({ organizationParams: { isActive: false } });
	test('redirected to billing page to re-subscribe', async ({ page, org }) => {
		const url = getRoute({
			entity: 'portfolio',
			pageType: PageType.List,
			params: { organizationId: org.organization.id },
		});

		await page.goto(url);

		await expect(page).toHaveURL(/\/billing/);

		const btn = page.getByRole('button', { name: 'Subscribe' });
		await expect(btn).toBeVisible();
	});

	test('can still create new organization', async ({ page, isMobile }) => {
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
