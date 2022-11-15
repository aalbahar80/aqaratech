import { leaseInvoiceFactory } from '@self/seed';
import * as R from 'remeda';
import type { LeaseInvoiceDto } from '../../../types/api';
import { resCheck } from '../../../utils/res-check';
import { apiURL } from './api-url';
import type { AllFixtures } from './test-fixtures.interface';

export const invoiceFixtures: AllFixtures = {
	invoicesParams: [undefined, { option: true }],

	invoices: async ({ org, portfolio, lease, request, invoicesParams }, use) => {
		const params = invoicesParams ?? [{}];

		const leaseInvoices = R.times(params.length, (n) =>
			leaseInvoiceFactory.build({
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
				leaseId: lease.id,
				...params[n],
			}),
		);

		// Insert leaseInvoices

		const url = `${apiURL}/organizations/${org.organization.id}/leaseInvoices`;

		const created = (await Promise.all(
			leaseInvoices.map(async (leaseInvoice) => {
				const picked = R.pick(leaseInvoice, [
					'portfolioId',
					'leaseId',
					'amount',
					'isPaid',
					'memo',
					'postAt',
					'paidAt',
					'dueAt',
				]);

				const res = await request.post(url, { data: picked });
				resCheck(res);

				return (await res.json()) as LeaseInvoiceDto;
			}),
		)) as [LeaseInvoiceDto, ...LeaseInvoiceDto[]];

		await use(created);
	},

	invoice: async ({ invoices }, use) => {
		await use(invoices[0]);
	},
};
