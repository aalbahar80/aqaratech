import { z } from 'zod';

import { MAINTENANCE_ORDER_STATUS } from '../constants/maintenance-status';

import { zodDateOnlyOptional } from './utils/date/zod-date-only';
import { isID } from './utils/id.schema';
import { zodStringOptional } from './utils/zod-string';

export const maintenanceOrderCreateSchema = z
	.object({
		portfolioId: isID,
		propertyId: isID.nullish(),
		unitId: isID.nullish(),
		tenantId: isID.nullish(),

		completedAt: zodDateOnlyOptional,
		title: zodStringOptional,
		description: zodStringOptional,
		status: z.enum(MAINTENANCE_ORDER_STATUS).nullish(),
	})
	.strict();

export const maintenanceOrderUpdateSchema = maintenanceOrderCreateSchema
	.omit({
		portfolioId: true,
		propertyId: true,
		unitId: true,
		tenantId: true,
	})
	.partial();

// Export types

export type MaintenanceOrderCreateSchema = z.infer<
	typeof maintenanceOrderCreateSchema
>;

export type MaintenanceOrderUpdateSchema = z.infer<
	typeof maintenanceOrderUpdateSchema
>;
