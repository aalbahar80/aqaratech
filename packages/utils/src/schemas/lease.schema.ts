import { zodNumber } from 'src/schemas/utils/string-to-number';
import { zodCheckbox } from 'src/schemas/utils/zod-checkbox';
import { z } from 'zod';
import { zodDateOnly } from './utils/date/zod-date-only';
import { isID } from './utils/id.schema';

const base = z
	.object({
		monthlyRent: zodNumber,
		start: zodDateOnly,
		end: zodDateOnly,
		notify: zodCheckbox,
		canPay: zodCheckbox,
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

function refineSchema<T extends z.ZodType<Base>>(schema: T) {
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

type Base = z.infer<typeof baseCreate | typeof baseUpdate>;

/**
 * Exported seperately to make it easy to implement in DTO
 */
export type LeaseCreateSchema = z.infer<typeof baseCreate>;

/**
 * Exported seperately to make it easy to implement in DTO
 */
export type LeaseUpdateSchema = z.infer<typeof baseUpdate>;
