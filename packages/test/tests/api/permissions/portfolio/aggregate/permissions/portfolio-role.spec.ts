import { randomUUID } from 'crypto';

import { expect, type APIResponse } from '@playwright/test';

import { sample } from '@self/seed';

import { getUrl } from '../../../../../../utils/post-url';
import { test } from '../../../../api-fixtures';
import { AggregateType, aggregateTypes } from '../aggregate-types';

test.use({
	userRoleType: 'PORTFOLIO',
});

for (const agg of aggregateTypes) {
	test(`can get ${agg} for own portfolio`, async ({ request, portfolio }) => {
		const portfolioId = portfolio.id;
		const url = getUrl({
			organizationId: portfolio.organizationId,
			portfolioId,
		})[agg];

		let res: APIResponse;
		if (agg === AggregateType.Income) {
			res = await request.get(url, { params: { portfolioId } });
		} else {
			res = await request.get(url);
		}

		expect(res.status()).toBe(200);
	});

	test(`cannot get ${agg} for other portfolio`, async ({
		request,
		portfolio,
	}) => {
		const portfolioId = sample.portfolios[0].id;
		const url = getUrl({
			organizationId: portfolio.organizationId,
			portfolioId,
		})[agg];

		let res: APIResponse;
		if (agg === AggregateType.Income) {
			res = await request.get(url, { params: { portfolioId } });
		} else {
			res = await request.get(url);
		}
		expect(res.status()).toBe(403);
	});

	test(`cannot get ${agg} for non-existing portfolio`, async ({
		org,
		request,
	}) => {
		const portfolioId = randomUUID();
		const url = getUrl({
			organizationId: org.organization.id,
			portfolioId,
		})[agg];

		let res: APIResponse;
		if (agg === AggregateType.Income) {
			res = await request.get(url, { params: { portfolioId } });
		} else {
			res = await request.get(url);
		}
		expect(res.status()).toBe(403);
	});

	test(`${agg} - must specify portfolioId`, async ({ request, portfolio }) => {
		test.skip(agg === AggregateType.Expenses); // remove if expenses is ever non-portfolio scoped

		const url = getUrl({
			organizationId: portfolio.organizationId,
		})[agg];

		const res = await request.get(url);
		expect(res.status()).toBe(403);
	});
}
