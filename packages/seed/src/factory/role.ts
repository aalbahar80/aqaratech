import { faker } from '@faker-js/faker';
import type { Role } from '@prisma/client';
import * as Factory from 'factory.ts';
import { abstractFactory } from './abstract';

export const roleFactory = Factory.Sync.makeFactoryWithRequired<
	Role,
	'userId' | 'organizationId'
>({
	roleType: Factory.each(() => 'ORGADMIN'),
	portfolioId: null,
	tenantId: null,
	isAccepted: faker.datatype.boolean(),
	isDefault: faker.datatype.boolean(),
	permissions: null,
}).combine(abstractFactory);
