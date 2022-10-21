import { expect } from '@playwright/test';
import { portfolioFactory, sample } from '@self/seed';
import { randomUUID } from 'crypto';
import * as R from 'remeda';
import { test } from '../../../api-fixtures';

test('can create portfolio in own org', async ({ request, org }) => {
	const portfolio = R.pick(
		portfolioFactory.build({
			organizationId: org.organization.id,
		}),
		['fullName'],
	);
	const res = await request.post(
		`/organizations/${org.organization.id}/portfolios`,
		{ data: portfolio },
	);

	expect(res.status()).toBe(201);
});

test('cannot create portfolio in another org', async ({ request, org }) => {
	const portfolio = R.pick(
		portfolioFactory.build({
			organizationId: org.organization.id,
		}),
		['fullName'],
	);
	const res = await request.post(
		`/organizations/${sample.organizations[0]!.id}/portfolios`,
		{ data: portfolio },
	);

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403); // or 404?
});

test('cannot create portfolio in non-existing org', async ({
	request,
	org,
}) => {
	const portfolio = R.pick(
		portfolioFactory.build({
			organizationId: org.organization.id,
		}),
		['fullName'],
	);
	const res = await request.post(`/organizations/${randomUUID()}/portfolios`, {
		data: portfolio,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403); // won't pass guard
});
