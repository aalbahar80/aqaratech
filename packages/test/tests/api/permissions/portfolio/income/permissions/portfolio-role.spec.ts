import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { randomUUID } from 'crypto';
import { test } from '../../../../api-fixtures';
import { apiURL } from '../../../../fixtures/api-url';

test.setTimeout(0);
test.use({
	userRoleType: 'PORTFOLIO',
});

const getUrl = (organizationId: string, portfolioId: string) =>
	`${apiURL}/organizations/${organizationId}/portfolios/${portfolioId}/aggregate/income`;

test('can get income by month for own portfolio', async ({
	scopedRequest,
	portfolio,
}) => {
	console.log({ portfolio }, 'portfolio-role.spec.ts ~ 18');

	const url = getUrl(portfolio.organizationId, portfolio.id);

	const res = await scopedRequest.get(url);

	expect(res.status()).toBe(200);
});

test('cannot get income by month for other portfolio', async ({
	scopedRequest,
	portfolio,
}) => {
	const url = getUrl(portfolio.organizationId, sample.portfolios[0]!.id);

	const res = await scopedRequest.get(url);

	expect(res.status()).toBe(403);
});

test('cannot get income by month for non-existing portfolio', async ({
	org,
	scopedRequest,
}) => {
	const url = getUrl(org.organization.id, randomUUID());

	const res = await scopedRequest.get(url);

	expect(res.status()).toBe(403);
});
