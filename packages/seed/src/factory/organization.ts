import { faker } from '@faker-js/faker';
import type { Organization } from '@prisma/client';
import * as Factory from 'factory.ts';
import type { Strict } from '../utils/strict';
import { abstractFactory } from './abstract';

export const organizationFactory = Factory.Sync.makeFactory<
	Strict<Organization>
>({
	fullName: faker.company.name(),
	label: faker.company.catchPhrase(),
	isActive: faker.datatype.boolean(),
	// @ts-expect-error factory.ts does not support optional/nullable properties
	planId: null,
}).combine(abstractFactory);
