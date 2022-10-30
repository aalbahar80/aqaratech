import { expect } from '@playwright/test';
import { getUrl } from '../../../../../utils/post-url';
import { test } from '../../../api-fixtures';

const aggregateTypes = ['incomeAggregate', 'expensesAggregate'] as const;

for (const agg of aggregateTypes) {
	test(`${agg} returns array of date & amount`, async ({
		request,
		portfolio,
	}) => {
		const url = getUrl({
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		})[agg];

		const res = await request.get(url);

		expect(res.status()).toBe(200);

		const body: unknown = await res.json();

		expect.soft(body).toHaveLength(2);

		expect.soft(body).toContainEqual({
			date: expect.any(String),
			amount: expect.any(Number),
		});

		if (!Array.isArray(body)) {
			throw new Error('body is not an array');
		}

		// test each item in the array
		body.forEach((item) => {
			expect.soft(item).toMatchObject({
				date: expect.any(String),
				amount: expect.any(Number),
			});
		});
	});

	const inputs = [
		{ start: '2021-01-01', end: '2021-01-31', expected: 1 },
		{ start: '2021-01-01', end: '2021-02-28', expected: 2 },
		{ start: '2021-01-01', end: '2021-03-31', expected: 3 },
		{ start: '2020-12-31', end: '2021-04-30', expected: 5 },
		{ start: '2021-01-01', end: '2021-12-31', expected: 12 },
		{ start: '2020-12-31', end: '2021-12-31', expected: 13 },
		{ start: '2021-01-01', end: '2022-01-01', expected: 13 },
	];

	for (const { start, end, expected } of inputs) {
		test(`${agg} returns correct amount of datapoints: ${start}-${end}:${expected}`, async ({
			request,
			portfolio,
		}) => {
			const url = getUrl({
				organizationId: portfolio.organizationId,
				portfolioId: portfolio.id,
			})[agg];

			const res = await request.get(url, { params: { start, end } });

			expect.soft(res.status()).toBe(200);

			const body: unknown = await res.json();

			expect(body).toHaveLength(expected);
		});
	}

	test(`${agg} query defaults to last two months`, async ({
		request,
		portfolio,
	}) => {
		const url = getUrl({
			organizationId: portfolio.organizationId,
			portfolioId: portfolio.id,
		})[agg];

		const res = await request.get(url);

		expect(res.status()).toBe(200);

		const body: unknown = await res.json();

		expect.soft(body).toHaveLength(2);

		// last month in YYYY-MM format
		const lastMonth = new Date();
		lastMonth.setMonth(lastMonth.getMonth() - 1);
		const lastMonthString = lastMonth.toISOString().slice(0, 7);

		// this month in YYYY-MM format
		const thisMonth = new Date();
		const thisMonthString = thisMonth.toISOString().slice(0, 7);

		expect.soft(body).toHaveLength(2);

		expect.soft(body).toContainEqual({
			date: expect.stringMatching(lastMonthString),
			amount: expect.any(Number),
		});

		expect.soft(body).toContainEqual({
			date: expect.stringMatching(thisMonthString),
			amount: expect.any(Number),
		});
	});
}
