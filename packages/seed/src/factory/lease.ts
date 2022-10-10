import { faker } from '@faker-js/faker';
import type { Lease } from '@prisma/client';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import { TIMESPAN } from '../constants';
import { createdAt, updatedAt } from '../utils/dates';

export const leaseFactory = Factory.Sync.makeFactoryWithRequired<
	Lease,
	'organizationId' | 'portfolioId' | 'unitId' | 'tenantId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	start: Factory.each(() => faker.date.past(TIMESPAN)),
	end: Factory.each(() => faker.date.future()),

	license: Factory.each(() => faker.company.bs()),
	monthlyRent: Factory.each(() => +faker.finance.amount(1500, 3000, 0)),
	deposit: Factory.each(() => +faker.finance.amount(100, 3000, 0)),

	canPay: Factory.each(() => faker.datatype.boolean()),
	notify: Factory.each(() => faker.datatype.boolean()),
});
