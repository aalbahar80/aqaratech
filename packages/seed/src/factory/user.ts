import { faker } from '@faker-js/faker';
import type { User } from '@prisma/client';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import { createdAt, updatedAt } from '../utils/dates';
import type { Strict } from '../utils/strict';

export const userFactory: Factory.Sync.Factory<Strict<User>> =
	Factory.Sync.makeFactory({
		id: Factory.each(() => randomUUID()),
		createdAt: Factory.each(() => createdAt()),
		updatedAt: Factory.each(() => updatedAt()),

		fullName: Factory.Sync.each(() => faker.name.fullName()),
		email: Factory.Sync.each(() => faker.internet.email()),
	});
