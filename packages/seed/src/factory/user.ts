import { faker } from '@faker-js/faker';
import type { User } from '@prisma/client';
import * as Factory from 'factory.ts';
import type { Strict } from '../utils/strict';
import { abstractFactory } from './abstract';

export const userFactory: Factory.Sync.Factory<Strict<User>> =
	Factory.Sync.makeFactory({
		fullName: Factory.Sync.each(() => faker.name.fullName()),
		email: Factory.Sync.each(() => faker.internet.email()),
	}).combine(abstractFactory);
