import { faker } from '@faker-js/faker';
import type { Organization } from '@prisma/client';
import * as Factory from 'factory.ts';
import { abstractFactory } from './abstract';

export const organizationFactory = Factory.Sync.makeFactory<Organization>({
	fullName: faker.company.name(),
	label: null,
	isActive: faker.datatype.boolean(),
	planId: null,
}).combine(abstractFactory);
