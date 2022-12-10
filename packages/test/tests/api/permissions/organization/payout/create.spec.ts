import { randomUUID } from 'crypto';

import { expect } from '@playwright/test';
import * as R from 'remeda';

import { payoutFactory, sample } from '@self/seed';

import { PostUrl } from '../../../../../utils/post-url';
import { test } from '../../../api-fixtures';

test('can create payout in own org', async ({ request, org, property }) => {
	const payout = R.pick(
		payoutFactory.build({
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
		}),
		['portfolioId', 'amount', 'postAt'],
	);

	const url = PostUrl(org.organization.id).payout;

	const res = await request.post(url, { data: payout });

	expect(res.status()).toBe(201);
});

test('cannot create payout in another org', async ({
	request,
	org,
	property,
}) => {
	const payout = R.pick(
		payoutFactory.build({
			organizationId: org.organization.id,
			portfolioId: property.portfolioId,
		}),
		['portfolioId', 'amount', 'postAt'],
	);

	const url = PostUrl(sample.organizations[0].id).payout;

	const res = await request.post(url, { data: payout });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot create payout in non-existing org', async ({
	request,
	portfolio,
}) => {
	const orgId = randomUUID();
	const payout = R.pick(
		payoutFactory.build({
			organizationId: orgId,
			portfolioId: portfolio.id,
		}),
		['portfolioId', 'amount', 'postAt'],
	);

	const url = PostUrl(orgId).payout;

	const res = await request.post(url, { data: payout });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot create payout in non-existing portfolio', async ({
	request,
	org,
}) => {
	const payout = R.pick(
		payoutFactory.build({
			organizationId: org.organization.id,
			portfolioId: randomUUID(),
		}),
		['portfolioId', 'amount', 'postAt'],
	);

	const url = PostUrl(org.organization.id).payout;

	const res = await request.post(url, { data: payout });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(404);
});
