import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { randomUUID } from 'crypto';
import { test } from '../../../../api-fixtures';
import { apiURL } from '../../../../fixtures/api-url';

const getUrl = (organizationId: string, portfolioId: string) =>
	`${apiURL}/organizations/${organizationId}/portfolios/${portfolioId}/aggregate/income`;

test('can get income by month for portfolio in own org', async ({
	request,
	portfolio,
}) => {
	const url = getUrl(portfolio.organizationId, portfolio.id);

	const res = await request.get(url);

	expect(res.status()).toBe(200);
});

test('cannot get income by month portfolio in another org', async ({
	request,
	org: _org,
}) => {
	const url = getUrl(sample.organizations[0]!.id, sample.portfolios[0]!.id);

	const res = await request.get(url);

	expect(res.status()).toBe(403);
});

test('cannot get income by month for non-existing portfolio', async ({
	org,
	request,
}) => {
	const url = getUrl(org.organization.id, randomUUID());

	const res = await request.get(url);

	expect.soft(res.status()).toBe(200);

	const body: unknown = await res.json();

	expect.soft(body).toContainEqual({
		amount: 0, // should return "blank" data points
		date: expect.any(String),
	});
});
