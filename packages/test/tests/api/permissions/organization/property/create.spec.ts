import { expect } from '@playwright/test';
import { propertyFactory, sample } from '@self/seed';
import { randomUUID } from 'crypto';
import * as R from 'remeda';
import { test } from '../../../api-fixtures';

test('can create property in own org', async ({ request, org, portfolio }) => {
	const property = R.pick(
		propertyFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		}),
		['area', 'block', 'street', 'number'],
	);

	const url = `/organizations/${org.organization.id}/portfolios/${portfolio.id}/properties`;

	const res = await request.post(url, { data: property });

	expect(res.status()).toBe(201);
});

test('cannot create property in another org', async ({
	request,
	org,
	portfolio,
}) => {
	const property = R.pick(
		propertyFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		}),
		['area', 'street'],
	);

	const url = `/organizations/${sample.organizations[0]!.id}/portfolios/${
		portfolio.id
	}/properties`;

	const res = await request.post(url, { data: property });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403); // or 404?
});

test('cannot create property in non-existing portfolio', async ({
	request,
	org,
}) => {
	const property = R.pick(
		propertyFactory.build({
			organizationId: org.organization.id,
			portfolioId: randomUUID(),
		}),
		['area', 'block', 'street', 'number'],
	);

	const url = `/organizations/${
		org.organization.id
	}/portfolios/${randomUUID()}/properties`;

	const res = await request.post(url, { data: property });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(404);
});
