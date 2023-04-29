import { expect } from '@playwright/test';
import * as R from 'remeda';

import { getUrl } from '../../../utils/post-url';
import { test } from '../api-fixtures';

import type { GroupByMonthDto } from '../../../types/api';

test.use({
	expensesParams: R.range(0, 12).flatMap((month) => ({
		postAt: new Date(Date.UTC(2021, month, 1)).toISOString().slice(0, 10),
		amount: 100,
	})),
});

test('return 12 data points for a year', async ({ request, portfolio }) => {
	const url = getUrl({
		organizationId: portfolio.organizationId,
		portfolioId: portfolio.id,
	}).expensesAggregate;

	const res = await request.get(url, {
		params: {
			start: '2021-01-01',
			end: '2021-12-31',
			// end: '2022-01-01', // TODO: test this too
		},
	});

	const body = (await res.json()) as GroupByMonthDto[];

	expect(body).toHaveLength(12);
});

test('return 12 data points for a year with correct data', async ({
	request,
	portfolio,
	expenses: _expenses,
}) => {
	const url = getUrl({
		organizationId: portfolio.organizationId,
		portfolioId: portfolio.id,
	}).expensesAggregate;

	const res = await request.get(url, {
		params: {
			start: '2021-01-01',
			end: '2021-12-31',
		},
	});

	const body = (await res.json()) as GroupByMonthDto[];

	expect.soft(body).toHaveLength(12);
	expect.soft(body[0]).toEqual({
		amount: 100,
		date: '2021-12',
	});
	expect.soft(body[11]).toEqual({
		amount: 100,
		date: '2021-01',
	});
});
