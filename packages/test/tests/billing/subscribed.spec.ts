import { expect } from '@playwright/test';
import tier from 'tier';

import { getRoute, PageTab, tierid } from '@self/utils';

import { test } from '../api/api-fixtures';
import { apiURL } from '../api/fixtures/api-url';
import { plan } from '../api/fixtures/env';

test.use({ organizationParams: { isActive: true } });

test.slow();

test.describe.configure({ mode: 'parallel' });

test.describe('subscribed', () => {
	test('can unsubscribe', async ({ page, org }) => {
		const orgId = tierid(org.organization.id);

		const phase = await tier.lookupPhase(orgId);

		expect(phase.plans).toContainEqual(plan);

		const url = getRoute({
			entity: 'organization',
			pageType: PageTab.Billing,
			id: org.organization.id,
			params: {
				organizationId: org.organization.id,
			},
		});

		await page.goto(url);

		// Click unsubscribe
		await page.getByRole('button', { name: 'Cancel subscription' }).click();

		// Wait for network request
		await page.waitForTimeout(3000);

		const promise = tier.lookupPhase(orgId);

		await expect(promise).rejects.toThrowError('Not Found');
	});

	test('is unsubscribed after deleting org', async ({ request, org }) => {
		const url = `${apiURL}/organizations/${org.organization.id}`;

		const res = await request.delete(url);

		expect(res.status()).toBe(200);

		const promise = tier.lookupPhase(tierid(org.organization.id));

		await expect(promise).rejects.toThrowError('Not Found');
	});
});

test.describe('can unsubscribe after restoring subscription', () => {
	test.use({ organizationParams: { isActive: false } });

	test('title', async ({ page, org }) => {
		const id = tierid(org.organization.id);

		await tier.subscribe(id, plan);

		const url = getRoute({
			entity: 'organization',
			pageType: PageTab.Billing,
			id: org.organization.id,
			params: {
				organizationId: org.organization.id,
			},
		});

		await page.goto(url);

		const btn = page.getByRole('button', { name: 'Cancel subscription' });

		await btn.click();

		// Wait for network request
		await page.waitForTimeout(3000);

		const promise = tier.lookupPhase(id);

		await expect.soft(promise).rejects.toThrowError('Not Found');

		await expect.soft(btn).toBeHidden();
	});
});
