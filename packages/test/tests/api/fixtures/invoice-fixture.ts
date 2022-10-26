import { leaseInvoiceFactory } from '@self/seed';
import * as R from 'remeda';
import type { LeaseInvoiceDto } from '../../../types/api';
import { apiURL } from './api-url';
import type { AllFixtures } from './test-fixtures.interface';

export const invoiceFixtures: AllFixtures = {
	invoiceParams: [undefined, { option: true }],

	invoice: async ({ org, portfolio, lease, request, invoiceParams }, use) => {
		const invoice = R.pick(
			leaseInvoiceFactory.build({
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
				leaseId: lease.id,
				...invoiceParams,
			}),
			[
				'portfolioId',
				'leaseId',
				'amount',
				'isPaid',
				'memo',
				'postAt',
				'paidAt',
				'dueAt',
			],
		);

		const url = `${apiURL}/organizations/${org.organization.id}/leaseInvoices`;

		const res = await request.post(url, { data: invoice });

		const created = (await res.json()) as LeaseInvoiceDto;

		await use(created);
	},
};
