import { expect } from '@playwright/test';
import { leaseInvoiceFactory } from '@self/seed';
import * as R from 'remeda';
import type { ByMonthDto } from '../../../types/api';
import { test } from '../api-fixtures';

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
			leaseInvoices.map((leaseInvoice) =>
				request.post(url, {
					data: leaseInvoice,
				}),
			),
		);

		await use(lease);
	},
});

test('return 12 data points for a year', async ({ request, lease }) => {
	const res = await request.get('/aggregate/incomeByMonth', {
		params: {
			portfolioId: lease.portfolioId,
			start: '2021-01-01',
			end: '2022-01-01',
			// end: '2021-12-31', // TODO: test this too
		},
	});

	const invoices = (await res.json()) as ByMonthDto[];

	expect(invoices.length).toBe(12);
});
