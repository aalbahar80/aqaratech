import * as R from 'remeda';

import { leaseInvoiceFactory } from '@self/seed';

import { prisma } from '../../../prisma';

import type { AllFixtures } from './test-fixtures.interface';
import type { LeaseInvoice } from '@prisma/client';

export const invoiceFixtures: AllFixtures = {
	invoicesParams: [undefined, { option: true }],

	invoices: async ({ org, portfolio, lease, invoicesParams }, use) => {
		const params = invoicesParams ?? [{}];

		const leaseInvoices = R.times(params.length, (n) => {
			const data = leaseInvoiceFactory.build({
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
				leaseId: lease.id,
				...params[n],
			});

			data.postAt &&= new Date(data.postAt).toISOString();
			data.dueAt &&= new Date(data.dueAt).toISOString();
			data.paidAt &&= new Date(data.paidAt).toISOString();

			return data;
		});

		// Insert leaseInvoices

		await prisma.leaseInvoice.createMany({
			data: leaseInvoices.map(
				R.pick([
					'organizationId',
					'portfolioId',
					'leaseId',
					'amount',
					'isPaid',
					'memo',
					'postAt',
					'paidAt',
					'dueAt',
				]),
			),
		});

		const created = await prisma.leaseInvoice.findMany({
			where: {
				organizationId: org.organization.id,
			},
		});

		await use(created as [LeaseInvoice, ...LeaseInvoice[]]);
	},

	invoice: async ({ invoices }, use) => {
		await use(invoices[0]);
	},
};
