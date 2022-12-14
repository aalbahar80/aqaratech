import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { createdAt, updatedAt } from '../utils/dates';
import { fakeDate } from '../utils/fake-date';

import type { MaintenanceOrder } from '../utils/date-or-string';

export const maintenanceOrderFactory = Factory.Sync.makeFactoryWithRequired<
	MaintenanceOrder,
	'organizationId' | 'portfolioId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	title: Factory.each(() => faker.lorem.words(2)),

	description: Factory.each(() => faker.lorem.sentences(3)),

	status: Factory.each(() =>
		faker.helpers.arrayElement(['pending', 'completed', 'cancelled', '']),
	),

	completedAt: Factory.each(() => fakeDate()),

	propertyId: null,

	unitId: null,

	tenantId: null,
});

export const maintenanceOrderPartialFactory = () =>
	maintenanceOrderFactory.build({
		organizationId: '',
		portfolioId: '',
		unitId: '',
		tenantId: '',
	});

export type MaintenanceOrderFactoryParams = Partial<
	Parameters<typeof maintenanceOrderFactory.build>[0]
>;
