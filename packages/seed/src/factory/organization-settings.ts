import { randomUUID } from 'node:crypto';

import * as Factory from 'factory.ts';

import { generateExpenseCategoryTree } from '../constants';
import { createdAt, updatedAt } from '../utils/dates';

import type { OrganizationSettings } from '@prisma/client';

export const organizationSettingsFactory = Factory.Sync.makeFactoryWithRequired<
	OrganizationSettings,
	'organizationId'
>({
	id: Factory.each(() => randomUUID()),
	createdAt: Factory.each(() => createdAt()),
	updatedAt: Factory.each(() => updatedAt()),

	expenseCategoryTree: Factory.each(() => generateExpenseCategoryTree()),
});
