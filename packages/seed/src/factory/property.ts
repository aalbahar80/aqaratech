import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { areas } from '../constants';
import { createdAt, updatedAt } from '../utils/dates';

import type { Property } from '../utils/date-or-string';

export const propertyFactory = Factory.Sync.makeFactoryWithRequired<
	Property,
	'organizationId' | 'portfolioId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	area: Factory.each(
		() => areas[Math.floor(Math.random() * areas.length)]?.[1] ?? null,
	),

	label: Factory.each(() => faker.location.streetAddress()),

	cost: null, // rm?

	// address
	block: Factory.each(() => faker.number.int({ min: 1, max: 13 }).toString()),

	street: `شارع ${faker.helpers.arrayElement([
		faker.person.lastName(),
		faker.number.int({ min: 1, max: 500 }).toString(),
	])}`,

	avenue: Factory.each(() => faker.number.int({ min: 1, max: 100 }).toString()),

	number: Factory.each(() => faker.number.int({ min: 1, max: 100 }).toString()),

	paci: Factory.each(() =>
		faker.number.int({ min: 10000000, max: 19999999 }).toString(),
	),

	parcel: Factory.each(() =>
		faker.number.int({ min: 100, max: 999999 }).toString(),
	),
});

export const propertyPartialFactory = () =>
	propertyFactory.build({
		organizationId: '',
		portfolioId: '',
	});

export type PropertyFactoryParams = Partial<
	Parameters<typeof propertyFactory.build>[0]
>;
