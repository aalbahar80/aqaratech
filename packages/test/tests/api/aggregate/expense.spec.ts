import { expect } from '@playwright/test';
import * as R from 'remeda';

import { expenseFactory } from '@self/seed';

import { getUrl } from '../../../utils/post-url';
import { test } from '../api-fixtures';

import type { GroupByMonthDto } from '../../../types/api';

test.use({
	// create 2 expenses for each month of 2021
	portfolio: async ({ request, portfolio }, use) => {
		const expenses = R.range(0, 12).flatMap((month) => {
			const expense = expenseFactory.build({
				organizationId: portfolio.organizationId,
				portfolioId: portfolio.id,
				postAt: new Date(Date.UTC(2021, month, 1)).toISOString().slice(0, 10),
				amount: 100,
			});

			const picked = R.pick(expense, ['amount', 'postAt', 'portfolioId']);

			return [picked, picked];
		});

		// send post request for each expense
		const url = `/organizations/${portfolio.organizationId}/expenses`;

		await Promise.all(
			expenses.map(
				async (expense) =>
					await request.post(url, {
						data: expense,
					}),
			),
		);

		await use(portfolio);
	},
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

	expect(body.length).toBe(12);
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.skip('table shows 12 rows', () => {});
