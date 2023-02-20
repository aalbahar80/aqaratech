import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { createdAt, updatedAt } from '../utils/dates';

import type { Role } from '../utils/date-or-string';

export const roleFactory = Factory.Sync.makeFactoryWithRequired<
	Role & { email: string },
	'organizationId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	userId: Factory.each(() => randomUUID()), // Should always be passed in?

	roleType: Factory.each(() => 'ORGADMIN'),

	portfolioId: Factory.each(() => null),

	tenantId: Factory.each(() => null),

	isAccepted: Factory.each(() => faker.datatype.boolean()),

	isDefault: Factory.each(() => faker.datatype.boolean()),

	email: Factory.each(() => faker.internet.email()),
});

export type RoleFactoryParams = Partial<
	Parameters<typeof roleFactory.build>[0]
>;
