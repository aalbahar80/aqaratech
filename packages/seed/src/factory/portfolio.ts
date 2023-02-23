import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { faker as fakerAr } from '@faker-js/faker/locale/ar';
import * as Factory from 'factory.ts';

import { assertCount } from '../utils';
import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

import type { Portfolio } from '../utils/date-or-string';

const base = Factory.Sync.makeFactoryWithRequired<Portfolio, 'organizationId'>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	fullName: Factory.each(() => {
		const f = Math.random() > 0.5 ? faker : fakerAr;
		return [f.name.firstName(), f.name.firstName(), f.name.lastName()].join(
			' ',
		);
	}),

	label: Factory.each(() => faker.name.jobTitle()),

	civilid: Factory.each(() =>
		faker.datatype.number({ min: 200000000000, max: 399999999999 }).toString(),
	),

	dob: Factory.each(() => fakeDate()),

	phone: Factory.each(() => faker.phone.number('9#######')),
});

export const portfolioFactory = base.withDerivation('label', (portfolio) => {
	// derive label from fullName by excluding the middle name

	// if fullName is less than 3 words, return null
	const fullName = portfolio.fullName.split(' ');

	if (assertCount(fullName, 3)) {
		// remove the middle name
		const [firstName, lastName] = fullName;
		return `${firstName} ${lastName}`;
	} else {
		return null;
	}
});

export const portfolioPartialFactory = () =>
	portfolioFactory.build({
		organizationId: '',
	});

export type PortfolioFactoryParams = Partial<
	Parameters<typeof portfolioFactory.build>[0]
>;
