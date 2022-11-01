import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import type { Lease } from '../utils/date-or-string';
import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

const base = Factory.Sync.makeFactoryWithRequired<
	Lease,
	'organizationId' | 'portfolioId' | 'unitId' | 'tenantId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	// Dates
	start: Factory.each(() => fakeDate()),

	end: Factory.each(() => fakeDate()),

	license: Factory.each(() => faker.company.bs()),

	monthlyRent: Factory.each(() => +faker.finance.amount(1500, 3000, 0)),

	deposit: Factory.each(() => +faker.finance.amount(100, 3000, 0)),

	canPay: Factory.each(() => faker.datatype.boolean()),

	notify: Factory.each(() => faker.datatype.boolean()),
});

export const leaseFactory = base.withDerivation('end', (lease) => {
	const end = new Date(lease.start);
	end.setFullYear(end.getFullYear() + 1);
	return end.toISOString().slice(0, 10);
});
