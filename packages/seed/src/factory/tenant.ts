import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { faker as fakerAr } from '@faker-js/faker/locale/ar';
import * as Factory from 'factory.ts';

import { assertCount } from '../utils';
import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

import type { Tenant } from '../utils/date-or-string';

const base = Factory.Sync.makeFactoryWithRequired<Tenant, 'organizationId'>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	fullName: Factory.each(() => {
		const f = Math.random() > 0.5 ? faker : fakerAr;
		return [
			f.person.firstName(),
			f.person.firstName(),
			f.person.lastName(),
		].join(' ');
	}),

	label: Factory.each(() => null),

	civilid: Factory.each(() =>
		faker.number.int({ min: 200000000000, max: 399999999999 }).toString(),
	),

	dob: Factory.each(() => fakeDate()),

	phone: Factory.each(() => faker.phone.number('9#######')),

	passportNum: Factory.each(() =>
		faker.number.int({ min: 100000000, max: 999999999 }).toString(),
	),

	nationality: Factory.each(() => faker.location.countryCode('alpha-3')),

	residencyNum: Factory.each(() =>
		faker.number.int({ min: 100000000, max: 999999999 }).toString(),
	),

	residencyEnd: Factory.each(() => fakeDate()),
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
