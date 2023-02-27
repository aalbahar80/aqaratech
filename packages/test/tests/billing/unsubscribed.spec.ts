import { expect } from '@playwright/test';
import tier from 'tier';

import { getRoute, PageTab, tierid } from '@self/utils';

import { prisma } from '../../prisma';
import { test } from '../api/api-fixtures';
import { plan } from '../api/fixtures/env';
import { siteURL } from '../api/fixtures/site-url';

test.slow();

// tests in describe don't run in parallel
test.describe.configure({ mode: 'parallel' });

test.describe('unsubscribed', () => {
	// Sub then unsub to ensure we're in the right state

	// 1. start with an active subscription,
	test.use({ organizationParams: { isActive: true } });

	// 2. then cancel it in beforeEach
	test.beforeEach(async ({ org }) => {
		await tier.cancel(tierid(org.organization.id));
		// set isActive to false in our db
		await prisma.organization.update({
			where: { id: org.organization.id },
			data: { isActive: false },
		});
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

		await expect.soft(page).toHaveURL(/billing\.aqaratech\.com/, {
			timeout: 10000,
		});

		// Stripe's "subscribe" button
		const btn = page.getByTestId('hosted-payment-submit-button');

		await expect(btn).toBeVisible();
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
		await expect.soft(page).toHaveURL(/\/billing$/);

		// expect to see the cancel subscription button
		const cancel = page.getByRole('button', { name: 'Cancel subscription' });

		await expect.soft(cancel).toBeVisible();
	});
});
