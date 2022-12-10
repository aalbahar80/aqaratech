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
	test(`can get ${agg} for own portfolio`, async ({
		scopedRequest,
		portfolio,
	}) => {
		const url = getUrl({
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		})[agg];

		const res = await scopedRequest.get(url);

		expect(res.status()).toBe(200);
	});

	test(`cannot get ${agg} for other portfolio`, async ({
		scopedRequest,
		portfolio,
	}) => {
		const url = getUrl({
			organizationId: portfolio.organizationId,
			portfolioId: sample.portfolios[0].id,
		})[agg];

		const res = await scopedRequest.get(url);

		expect(res.status()).toBe(403);
	});

	test(`cannot get ${agg} for non-existing portfolio`, async ({
		org,
		scopedRequest,
	}) => {
		const url = getUrl({
			organizationId: org.organization.id,
			portfolioId: randomUUID(),
		})[agg];

		const res = await scopedRequest.get(url);

		expect(res.status()).toBe(403);
	});
}
