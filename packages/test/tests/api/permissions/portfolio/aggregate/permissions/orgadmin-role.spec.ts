import { randomUUID } from 'crypto';

import { expect } from '@playwright/test';

import { sample } from '@self/seed';

import { getUrl } from '../../../../../../utils/post-url';
import { test } from '../../../../api-fixtures';
import { aggregateBodyToArray, aggregateTypes } from '../aggregate-types';

for (const agg of aggregateTypes) {
	test(`can get ${agg} for portfolio in own org`, async ({
		request,
		portfolio,
	}) => {
		const url = getUrl({
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		})[agg];

		const res = await request.get(url);

		expect(res.status()).toBe(200);
	});

	test(`cannot get ${agg} portfolio in another org`, async ({
		request,
		org: _org,
	}) => {
		const url = getUrl({
			organizationId: sample.organizations[0].id,
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

		expect.soft(res.status()).toBe(200);

		const body: unknown = await res.json();

		const data = aggregateBodyToArray(body, agg);

		for (const item of data) {
			expect.soft(item).toContainEqual({
				amount: 0, // should return "blank" data points
				date: expect.any(String),
			});
		}
	});
}
