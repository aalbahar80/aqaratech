import { faker } from '@faker-js/faker';
import type { Unit } from '@prisma/client';
import * as Factory from 'factory.ts';
import { unitTypeOptions } from '../constants';
import type { Strict } from '../utils/strict';
import { abstractFactory } from './abstract';

const unitTypeValues = unitTypeOptions
	.filter((u) => u.value)
	.map((u) => u.value);

export const unitFactory = Factory.Sync.makeFactoryWithRequired<
	Strict<Unit>,
	'organizationId' | 'portfolioId' | 'propertyId'
>({
	floor: faker.datatype.number({ min: -2, max: 10 }),
	size: faker.datatype.number({ min: 1, max: 2000 }),
	bed: faker.datatype.number({ min: 1, max: 10 }),
	bath: faker.datatype.number({ min: 1, max: 10 }),
	marketRent: +faker.finance.amount(100, 3000, 0),
	unitNumber: faker.datatype.number({ min: 1, max: 100 }).toString(),
	// @ts-expect-error factory.ts does not support optional/nullable properties
	type: faker.helpers.arrayElement(unitTypeValues),
	// @ts-expect-error factory.ts does not support optional/nullable properties
	usage: null,
	// @ts-expect-error factory.ts does not support optional/nullable properties
	label: null,
}).combine(abstractFactory);
