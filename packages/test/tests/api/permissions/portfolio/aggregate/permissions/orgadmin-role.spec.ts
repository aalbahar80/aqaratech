import { randomUUID } from 'crypto';

import { expect, type APIResponse } from '@playwright/test';

import { sample } from '@self/seed';

import { getUrl } from '../../../../../../utils/post-url';
import { test } from '../../../../api-fixtures';
import {
	AggregateType,
	aggregateBodyToArray,
	aggregateTypes,
} from '../aggregate-types';

for (const agg of aggregateTypes) {
	test(`can get ${agg} for portfolio in own org`, async ({
		request,
		portfolio,
	}) => {
		const url = getUrl({
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		})[agg];

		let res: APIResponse;
		if (agg === AggregateType.Income) {
			res = await request.get(url, { params: { portfolioId: portfolio.id } });
		} else {
			res = await request.get(url);
		}

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

		let res: APIResponse;
		if (agg === AggregateType.Income) {
			res = await request.get(url, {
				params: { portfolioId: sample.portfolios[0].id },
			});
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
			expect.soft(res.status()).toBe(403);
		} else {
			res = await request.get(url);

			expect.soft(res.status()).toBe(200);

			const body: unknown = await res.json();

			const data = aggregateBodyToArray(body, agg);

			for (const item of data) {
				expect.soft(item).toContainEqual({
					amount: 0, // should return "blank" data points
					date: expect.any(String),
				});
			}
		}
	});
}
