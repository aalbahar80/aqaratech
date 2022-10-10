import { faker } from '@faker-js/faker';
import type { LeaseInvoice } from '../utils/date-or-string';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import { TIMESPAN } from '../constants';
import { createdAt, updatedAt } from '../utils/dates';

export const leaseInvoiceFactory = Factory.Sync.makeFactoryWithRequired<
	LeaseInvoice,
	'organizationId' | 'portfolioId' | 'leaseId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	amount: Factory.each(() => +faker.finance.amount(10, 250, 0)),
	memo: Factory.each(() => faker.lorem.sentence()),
	postAt: Factory.each(() => faker.date.past(TIMESPAN)),
	isPaid: Factory.each(() => faker.datatype.boolean()),

	mfPaymentId: Factory.each(() => randomUUID()),
	dueAt: Factory.each(() => faker.date.past(TIMESPAN)),
	paidAt: Factory.each(() => faker.date.past(TIMESPAN)),
});
