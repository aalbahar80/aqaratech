import { expect } from '@playwright/test';
import { portfolioFactory, sample } from '@self/seed';
import { randomUUID } from 'crypto';
import * as R from 'remeda';
import { test } from '../../../api-fixtures';

const newPortfolio = R.pick(
	portfolioFactory.build({
		organizationId: '',
	}),
	['fullName'],
);

test('can update portfolio in own org', async ({ request, portfolio }) => {
	const res = await request.patch(`/portfolios/${portfolio.id}`, {
		data: newPortfolio,
	});

	expect(res.status()).toBe(200);
});

test('cannot update portfolio in another org', async ({
	request,
	org: _org,
}) => {
	const res = await request.patch(`/portfolios/${sample.portfolios[0]!.id}`, {
		data: newPortfolio,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});

test('cannot update non-existing portfolio', async ({ request }) => {
	const res = await request.patch(`/portfolios/${randomUUID()}`, {
		data: newPortfolio,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(400);
});
