import { faker } from '@faker-js/faker';
import { Organization, Role, User } from '@prisma/client';
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

export const organizationFactory = Factory.Sync.makeFactory<Organization>({
	id: ID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	fullName: faker.company.name(),
	label: null,
	isActive: faker.datatype.boolean(),
	planId: null,
});

export const roleFactory = Factory.Sync.makeFactory<Role>({
	id: ID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	organizationId: ID(),
	portfolioId: null,
	tenantId: null,
	permissions: null,
	userId: ID(),
	isAccepted: faker.datatype.boolean(),
	isDefault: faker.datatype.boolean(),
	roleType: Factory.each(() => 'ORGADMIN'),
});
