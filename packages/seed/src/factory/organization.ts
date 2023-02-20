import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { createdAt, updatedAt } from '../utils/dates';

import type { Organization } from '../utils/date-or-string';

export const organizationFactory = Factory.Sync.makeFactory<Organization>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	fullName: Factory.each(() => faker.company.name()),

	label: Factory.each(() => faker.company.catchPhrase()),

	// isActive should always be true unless a test explicitly sets it to false
	isActive: Factory.each(() => true),
});

export type OrganizationFactoryParams = Partial<
	Parameters<typeof organizationFactory.build>[0]
>;
