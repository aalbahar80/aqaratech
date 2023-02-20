import { randomUUID } from 'crypto';

import { expect } from '@playwright/test';

import { sample } from '@self/seed';

import { getUrl } from '../../../../../../utils/post-url';
import { test } from '../../../../api-fixtures';
import { aggregateTypes } from '../aggregate-types';

test.use({
	userRoleType: 'PORTFOLIO',
});

for (const agg of aggregateTypes) {
	test(`can get ${agg} for own portfolio`, async ({ request, portfolio }) => {
		const url = getUrl({
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		})[agg];

		const res = await request.get(url);

		expect(res.status()).toBe(200);
	});

	test(`cannot get ${agg} for other portfolio`, async ({
		request,
		portfolio,
	}) => {
		const url = getUrl({
			organizationId: portfolio.organizationId,
			portfolioId: sample.portfolios[0].id,
		})[agg];

		const res = await request.get(url);

		expect(res.status()).toBe(403);
	});

	test(`cannot get ${agg} for non-existing portfolio`, async ({
		org,
		request,
	}) => {
		const url = getUrl({
			organizationId: org.organization.id,
			portfolioId: randomUUID(),
		})[agg];

		const res = await request.get(url);

		expect(res.status()).toBe(403);
	});
}
