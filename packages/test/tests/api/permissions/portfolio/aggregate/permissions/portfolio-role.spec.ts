import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { randomUUID } from 'crypto';
import { getUrl } from '../../../../../../utils/post-url';
import { test } from '../../../../api-fixtures';

test.use({
	userRoleType: 'PORTFOLIO',
});

test('can get income by month for own portfolio', async ({
	scopedRequest,
	portfolio,
}) => {
	const url = getUrl({
		organizationId: portfolio.organizationId,
		portfolioId: portfolio.id,
	}).incomeAggregate;

	const res = await scopedRequest.get(url);

	expect(res.status()).toBe(200);
});

test('cannot get income by month for other portfolio', async ({
	scopedRequest,
	portfolio,
}) => {
	const url = getUrl({
		organizationId: portfolio.organizationId,
		portfolioId: sample.portfolios[0]!.id,
	}).incomeAggregate;

	const res = await scopedRequest.get(url);

	expect(res.status()).toBe(403);
});

test('cannot get income by month for non-existing portfolio', async ({
	org,
	scopedRequest,
}) => {
	const url = getUrl({
		organizationId: org.organization.id,
		portfolioId: randomUUID(),
	}).incomeAggregate;

	const res = await scopedRequest.get(url);

	expect(res.status()).toBe(403);
});
