import { faker } from '@faker-js/faker';
import type { User } from '@prisma/client';
import * as Factory from 'factory.ts';
import { createdAt, updatedAt } from '../utils/dates';
import { ID } from '../utils/uuid';

export const userFactory = Factory.Sync.makeFactory<User>({
	id: ID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	fullName: faker.name.fullName(),
	email: faker.internet.email(),
});
