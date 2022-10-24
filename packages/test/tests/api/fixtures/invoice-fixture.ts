import { leaseInvoiceFactory, LeaseInvoiceFactoryParams } from '@self/seed';
import * as R from 'remeda';
import type { LeaseInvoiceDto } from '../../../types/api';
import { apiURL, test as base } from '../api-fixtures';

export const test = base.extend<{
	invoice: LeaseInvoiceDto;
	invoiceParams: LeaseInvoiceFactoryParams | undefined;
}>({
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

		console.log({ created }, 'invoice-fixture.ts ~ 30');

		await use(created);
	},
});
