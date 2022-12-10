import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import { createdAt, updatedAt } from '../utils/dates';

import type { User } from '../utils/date-or-string';


export const userFactory = Factory.Sync.makeFactory<User>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	fullName: Factory.Sync.each(() => faker.name.fullName()),

	email: Factory.Sync.each(() => faker.internet.email()),
});
