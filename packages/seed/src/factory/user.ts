import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import type { User } from '../utils/date-or-string';
import { createdAt, updatedAt } from '../utils/dates';

export const userFactory = Factory.Sync.makeFactory<User>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	fullName: Factory.Sync.each(() => faker.name.fullName()),
	email: Factory.Sync.each(() => faker.internet.email()),
});
