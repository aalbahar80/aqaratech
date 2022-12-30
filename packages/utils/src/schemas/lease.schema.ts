import { z } from 'zod';

import { zodDateOnly } from './utils/date/zod-date-only';
import { isID } from './utils/id.schema';
import { zodCheckbox } from './utils/zod-checkbox';
import { zodNumber } from './utils/zod-number';
import { zodStringOptional } from './utils/zod-string';

const base = z
	.object({
		monthlyRent: zodNumber,
		deposit: zodNumber,
		start: zodDateOnly,
		end: zodDateOnly,
		notify: zodCheckbox,
		canPay: zodCheckbox,
		license: zodStringOptional,
	})
	.strict();

const baseCreate = base.extend({
	portfolioId: isID,
	unitId: isID,
	tenantId: isID,
});

const baseUpdate = base.partial();

export const leaseCreateSchema = refineSchema(baseCreate);

export const leaseUpdateSchema = refineSchema(baseUpdate);

function refineSchema<
	T extends z.ZodType<
		z.TypeOf<typeof base | typeof baseUpdate>,
		z.ZodTypeDef,
		unknown
	>,
>(schema: T) {
	return schema
		.refine(
			(val) =>
				val.start && val.end && Date.parse(val.start) < Date.parse(val.end),
			{
				path: ['start'],
				message: 'Start date must be before end date',
			},
		)
		.refine(
			(val) =>
				val.start && val.end && Date.parse(val.start) < Date.parse(val.end),
			{
				path: ['end'],
				message: 'End date must be after start date',
			},
		);
}

// Export types

/**
 * Exported seperately to make it easy to implement in DTO
 */
export type LeaseCreateSchema = z.infer<typeof baseCreate>;

/**
 * Exported seperately to make it easy to implement in DTO
 */
export type LeaseUpdateSchema = z.infer<typeof baseUpdate>;
