import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';


import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

import type { Tenant } from '../utils/date-or-string';

export const tenantFactory = Factory.Sync.makeFactoryWithRequired<
	Tenant,
	'organizationId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	fullName: Factory.each(() => faker.name.fullName()),

	label: null,

	civilid: Factory.each(() =>
		faker.datatype.number({ min: 200000000000, max: 399999999999 }).toString(),
	),

	dob: Factory.each(() => fakeDate()),

	phone: Factory.each(() => faker.phone.number('9#######')),

	passportNum: Factory.each(() =>
		faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
	),

	nationality: Factory.each(() => faker.address.countryCode('alpha-3')),

	residencyNum: Factory.each(() =>
		faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
	),

	residencyEnd: Factory.each(() => faker.date.future(2)),
});

export type TenantFactoryParams = Partial<
	Parameters<typeof tenantFactory.build>[0]
>;
