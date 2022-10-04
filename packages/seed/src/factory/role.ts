import { faker } from '@faker-js/faker';
import type { Role } from '@prisma/client';
import * as Factory from 'factory.ts';
import { abstractFactory } from './abstract';

export const roleFactory = Factory.Sync.makeFactoryWithRequired<
	Role & { email: string },
	'userId' | 'organizationId'
>({
	roleType: Factory.each(() => 'ORGADMIN'),
	portfolioId: Factory.each(() => null),
	tenantId: Factory.each(() => null),
	isAccepted: Factory.each(() => faker.datatype.boolean()),
	isDefault: Factory.each(() => faker.datatype.boolean()),
	permissions: Factory.each(() => null),
	email: Factory.each(() => faker.internet.email()),
}).combine(abstractFactory);
