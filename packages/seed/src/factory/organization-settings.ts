import type { OrganizationSettings } from '@prisma/client';
import * as Factory from 'factory.ts';
import { randomUUID } from 'node:crypto';
import { generateExpenseCategoryTree } from '../constants';
import { createdAt, updatedAt } from '../utils/dates';

export const organizationSettingsFactory = Factory.Sync.makeFactoryWithRequired<
	OrganizationSettings,
	'organizationId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	expenseCategoryTree: Factory.each(() => generateExpenseCategoryTree()),
});
