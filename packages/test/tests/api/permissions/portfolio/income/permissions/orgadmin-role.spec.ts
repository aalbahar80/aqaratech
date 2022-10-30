import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { randomUUID } from 'crypto';
import { getUrl } from '../../../../../../utils/post-url';
import { test } from '../../../../api-fixtures';

test('can get income by month for portfolio in own org', async ({
	request,
	portfolio,
}) => {
	const url = getUrl({
		organizationId: portfolio.organizationId,
		portfolioId: portfolio.id,
	}).incomeAggregate;

	const res = await request.get(url);

	expect(res.status()).toBe(200);
});

test('cannot get income by month portfolio in another org', async ({
	request,
	org: _org,
}) => {
	const url = getUrl({
		organizationId: sample.organizations[0]!.id,
		portfolioId: sample.portfolios[0]!.id,
	}).incomeAggregate;

	const res = await request.get(url);

	expect(res.status()).toBe(403);
});

test('cannot get income by month for non-existing portfolio', async ({
	org,
	request,
}) => {
	const url = getUrl({
		organizationId: org.organization.id,
		portfolioId: randomUUID(),
	}).incomeAggregate;

	const res = await request.get(url);

	expect.soft(res.status()).toBe(200);

	const body: unknown = await res.json();

	expect.soft(body).toContainEqual({
		amount: 0, // should return "blank" data points
		date: expect.any(String),
	});
});
