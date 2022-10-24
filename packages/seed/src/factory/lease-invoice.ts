import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import type { LeaseInvoice } from '../utils/date-or-string';
import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

const base = Factory.Sync.makeFactoryWithRequired<
	LeaseInvoice,
	'organizationId' | 'portfolioId' | 'leaseId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	amount: Factory.each(() => +faker.finance.amount(10, 250, 0)),
	memo: Factory.each(() => faker.lorem.sentence()),
	postAt: Factory.each(() => fakeDate()),
	isPaid: Factory.each(() => faker.datatype.boolean()),

	mfPaymentId: Factory.each(() => randomUUID()),
	dueAt: Factory.each(() => fakeDate()),
	paidAt: Factory.each(() => fakeDate()),
});

export const addDueDate = base.withDerivation('dueAt', (leaseInvoice) => {
	// set dueAt to be 30 days after postAt
	const dueAt = new Date(leaseInvoice.postAt);
	dueAt.setDate(dueAt.getDate() + 30);
	return dueAt.toISOString().slice(0, 10);
});

export const leaseInvoiceFactory = addDueDate.withDerivation(
	'paidAt',
	(leaseInvoice) => {
		if (!leaseInvoice.isPaid) {
			return null;
		}
		// set paidAt to be 5 days after dueAt
		const paidAt = new Date(leaseInvoice.postAt);
		paidAt.setDate(paidAt.getDate() + 5);
		return paidAt.toISOString().slice(0, 10);
	},
);
