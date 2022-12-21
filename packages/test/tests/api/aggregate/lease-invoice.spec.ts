import { expect } from '@playwright/test';
import * as R from 'remeda';

import { leaseInvoiceFactory } from '@self/seed';

import { getUrl } from '../../../utils/post-url';
import { test } from '../api-fixtures';
import {
	aggregateBodyToArray,
	AggregateType,
} from '../permissions/portfolio/aggregate/aggregate-types';

test.use({
	// create 2 leaseInvoices for each month of 2021
	lease: async ({ request, lease }, use) => {
		const leaseInvoices = R.range(0, 12).flatMap((month) => {
			const leaseInvoice = leaseInvoiceFactory.build({
				organizationId: lease.organizationId,
				portfolioId: lease.portfolioId,
				leaseId: lease.id,
				postAt: new Date(Date.UTC(2021, month, 1)).toISOString().slice(0, 10),
			});

			const picked = R.pick(leaseInvoice, [
				'amount',
				'postAt',
				'isPaid',
				'dueAt',
				'paidAt',
				'portfolioId',
				'leaseId',
			]);

			return [picked, picked];
		});

		const url = `/organizations/${lease.organizationId}/leaseInvoices`;

		// send post request for each leaseInvoice
		await Promise.all(
			leaseInvoices.map(
				async (leaseInvoice) =>
					await request.post(url, {
						data: leaseInvoice,
					}),
			),
		);

		await use(lease);
	},
});

test('return 12 data points for a year', async ({ request, portfolio }) => {
	const url = getUrl({
		organizationId: portfolio.organizationId,
		portfolioId: portfolio.id,
	}).incomeAggregate;

	const res = await request.get(url, {
		params: {
			start: '2021-01-01',
			end: '2021-12-31',
			// end: '2022-01-01', // TODO: test this too
		},
	});

	const body: unknown = await res.json();

	const data = aggregateBodyToArray(body, AggregateType.Income);

	for (const item of data) {
		expect(item).toHaveLength(12);
	}
});
