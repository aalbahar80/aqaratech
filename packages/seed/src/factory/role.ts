import { faker } from '@faker-js/faker';
import type { Role } from '@prisma/client';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import { createdAt, updatedAt } from '../utils/dates';

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
	permissions: Factory.each(() => null),
	email: Factory.each(() => faker.internet.email()),
});
