import { z } from 'zod';

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
		status: z.enum(['pending', 'completed', 'cancelled', '']).nullish(),
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
