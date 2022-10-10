import { faker } from '@faker-js/faker';
import type { Organization } from '../utils/date-or-string';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import { createdAt, updatedAt } from '../utils/dates';

export const organizationFactory = Factory.Sync.makeFactory<Organization>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	fullName: faker.company.name(),
	label: faker.company.catchPhrase(),
	isActive: faker.datatype.boolean(),
	planId: null,
});
