import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import * as Factory from 'factory.ts';

import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

import type { LeaseInvoice } from '../utils/date-or-string';

const base = Factory.Sync.makeFactoryWithRequired<
	LeaseInvoice,
	'organizationId' | 'portfolioId' | 'leaseId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	amount: Factory.each(
		() => Math.round(faker.datatype.number({ min: 500, max: 3000 }) / 50) * 50,
	),

	memo: Factory.each(() => faker.lorem.sentence()),

	isPaid: Factory.each(() => faker.datatype.boolean()),

	// @ts-expect-error JsonNull vs JsonValue
	mfData: Factory.each(() => Prisma.DbNull),

	// Dates
	postAt: Factory.each(() => fakeDate()),

	dueAt: Factory.each(() => fakeDate()),

	paidAt: Factory.each(() => fakeDate()),
});

export const addDueDate = base.withDerivation('dueAt', (leaseInvoice) => {
	// set dueAt to be 30 days after postAt
	const dueAt = new Date(leaseInvoice.postAt);
	dueAt.setDate(dueAt.getDate() + 30);
	return dueAt.toISOString().slice(0, 10);
});

export const leaseInvoiceFactory = addDueDate
	.withDerivation('paidAt', (leaseInvoice) => {
		if (!leaseInvoice.isPaid) {
			return null;
		}

		const dur = faker.datatype.number({ min: 0, max: 40 });

		const paidAt = new Date(leaseInvoice.postAt);
		paidAt.setDate(paidAt.getDate() + dur);
		return paidAt.toISOString().slice(0, 10);
	})
	.withDerivation('mfPaymentId', (leaseInvoice) => {
		if (!leaseInvoice.isPaid) {
			return null;
		}

		return Math.random() > 0.5 ? randomUUID() : null;
	})
	.withDerivation('mfData', (leaseInvoice) => {
		if (!leaseInvoice.mfPaymentId) {
			return null;
		}

		const data = {
			IsSuccess: true,
			Message: '',
			ValidationErrors: null,
			Data: {
				InvoiceId: 2006790,
				InvoiceStatus: 'Paid',
				InvoiceReference: '2023035841',
				CustomerReference: leaseInvoice.id,
				CreatedDate: '2023-01-26T04:11:24.103',
				ExpiryDate: 'January 29, 2023',
				ExpiryTime: '04:11:24.103',
				InvoiceValue: leaseInvoice.amount,
				Comments: null,
				CustomerName: 'Test User',
				CustomerMobile: '+965',
				CustomerEmail: null,
				UserDefinedField: null,
				InvoiceDisplayValue: '2,200.000 KD',
				DueDeposit: 2194.75,
				DepositStatus: 'Not Deposited',
				InvoiceItems: [],
				InvoiceTransactions: [
					{
						TransactionDate: '2023-01-26T04:11:26.4333333',
						PaymentGateway: 'KNET',
						ReferenceId: '302610000046',
						TrackId: '26-01-2023_1434700',
						TransactionId: '202302652257856',
						PaymentId: leaseInvoice.mfPaymentId,
						AuthorizationId: 'B41175',
						TransactionStatus: 'Succss',
						TransationValue: '2,200.000',
						CustomerServiceCharge: '0.000',
						TotalServiceCharge: '5.000',
						DueValue: '2,200.000',
						PaidCurrency: 'KD',
						PaidCurrencyValue: '2,200.000',
						IpAddress: faker.internet.ip(),
						Country: 'Kuwait',
						Currency: 'KD',
						Error: null,
						CardNumber: null,
						ErrorCode: '',
					},
				],
				Suppliers: [],
			},
		};

		return data;
	});

export type LeaseInvoiceFactoryParams = Partial<
	Parameters<typeof leaseInvoiceFactory.build>[0]
>;

export const leaseInvoicePartialFactory = (
	data?: Partial<Parameters<(typeof base)['build']>['0']>,
) =>
	leaseInvoiceFactory.build({
		organizationId: '',
		portfolioId: '',
		leaseId: '',
		...data,
	});
