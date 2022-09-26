import { faker } from '@faker-js/faker';
import type { Role } from '@prisma/client';
import * as Factory from 'factory.ts';
import { createdAt, updatedAt } from '../utils/dates';
import { ID } from '../utils/uuid';

export const roleFactory = Factory.Sync.makeFactoryWithRequired<
	Role,
	'userId' | 'organizationId'
>({
	id: ID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	roleType: Factory.each(() => 'ORGADMIN'),
	portfolioId: null,
	tenantId: null,
	isAccepted: faker.datatype.boolean(),
	isDefault: faker.datatype.boolean(),
	permissions: null,
});
