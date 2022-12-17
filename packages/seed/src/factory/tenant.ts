import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { assertCount } from '../utils';
import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

import type { Tenant } from '../utils/date-or-string';

const base = Factory.Sync.makeFactoryWithRequired<Tenant, 'organizationId'>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	fullName: Factory.each(() =>
		[
			faker.name.firstName(),
			faker.name.firstName(),
			faker.name.lastName(),
		].join(' '),
	),

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

export const tenantFactory = base.withDerivation('label', (tenant) => {
	// derive label from fullName by excluding the middle name

	// if fullName is less than 3 words, return null
	const fullName = tenant.fullName.split(' ');

	if (assertCount(fullName, 3)) {
		// remove the middle name
		const [firstName, lastName] = fullName;
		return `${firstName} ${lastName}`;
	} else {
		return null;
	}
});

export type TenantFactoryParams = Partial<
	Parameters<typeof tenantFactory.build>[0]
>;
