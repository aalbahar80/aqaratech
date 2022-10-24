import { z } from 'zod';
import { zodDateOnly, zodDateOnlyOptional } from './utils/date/zod-date-only';
import { isID } from './utils/id.schema';
import { zodStringOptional } from './utils/zod-string';

const base = z
	.object({
		dueAt: zodDateOnlyOptional,
		postAt: zodDateOnly,
		paidAt: zodDateOnlyOptional,
		isPaid: z.boolean(),
		amount: z.number().gt(0),
		memo: zodStringOptional,
	})
	.strict();

const baseCreate = base.extend({
	portfolioId: isID,
	leaseId: isID,
});

const baseCreateMany = base.extend({
	portfolioId: isID,
});

const baseUpdate = base.partial();

export const leaseInvoiceCreateSchema = refineSchema(baseCreate);

export const leaseInvoiceUpdateSchema = refineSchema(baseUpdate);

export const leaseInvoiceCreateManySchema =
	refineSchema(baseCreateMany).array();

export const leaseInvoiceCreateManySchema2 = z.array(
	refineSchema(baseCreateMany),
);

// Version 3.19.1 breaks this type. Wait for a fix before upgrading.
// Issue: https://github.com/colinhacks/zod/issues/1473
function refineSchema<T extends z.ZodType<Base>>(schema: T) {
	return schema
		.refine(
			(val) => {
				/**
				 * Indicates that dueAt is set and is after postAt.
				 */
				const dueAterPost =
					val.dueAt &&
					val.postAt &&
					Date.parse(val.dueAt) >= Date.parse(val.postAt);

				// Return true if `dueAt` is not set to skip validation.
				return (
					val.dueAt === undefined ||
					val.dueAt === null ||
					val.dueAt === '' ||
					// Date.parse(val.postAt) <= Date.parse(val.dueAt)
					dueAterPost
				);
			},
			{
				path: ['dueAt'],
				message: 'Due date cannot be before post date',
			},
		)
		.refine(
			(val) => (val.isPaid && val.paidAt) || (!val.isPaid && !val.paidAt),
			(val) => ({
				path: ['paidAt'],
				message: val.isPaid
					? 'If this transaction is paid, you must enter a payment date'
					: 'If this transaction is not paid, you must clear the payment date',
			}),
		);
}

type Base = z.infer<
	typeof baseCreate | typeof baseUpdate | typeof baseCreateMany
>;

/**
 * Exported seperately to make it easy to implement in DTO
 */
export type LeaseInvoiceCreateSchema = z.infer<typeof baseCreate>;

/**
 * Exported seperately to make it easy to implement in DTO
 */
export type LeaseInvoiceUpdateSchema = z.infer<typeof baseUpdate>;

// Manually set type until zod can infer the leaseId does not exist in the baseCreateMany schema.
export type LeaseInvoiceCreateManySchema = z.infer<typeof baseCreateMany>;

// Doesn't infer the type correctly.
// export type LeaseInvoiceCreateManySchema = z.infer<
// 	typeof leaseInvoiceCreateManySchema
// >;
