import { faker } from '@faker-js/faker';
import type { Role } from '@prisma/client';
import * as Factory from 'factory.ts';
import type { Strict } from '../utils/strict';
import { abstractFactory } from './abstract';

export const roleFactory = Factory.Sync.makeFactoryWithRequired<
	Strict<Role>,
	'userId' | 'organizationId'
>({
	roleType: Factory.each(() => 'ORGADMIN'),
	// @ts-expect-error factory.ts does not support optional/nullable properties
	portfolioId: null,
	// @ts-expect-error factory.ts does not support optional/nullable properties
	tenantId: null,
	isAccepted: faker.datatype.boolean(),
	isDefault: faker.datatype.boolean(),
	// @ts-expect-error factory.ts does not support optional/nullable properties
	permissions: null,
}).combine(abstractFactory);
