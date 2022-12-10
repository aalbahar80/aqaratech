import { z } from 'zod';

import { zodDateOnlyOptional } from './utils/date/zod-date-only';

export const leaseInvoiceWarnSchema = z
	.object({
		postAt: zodDateOnlyOptional,
		paidAt: zodDateOnlyOptional,
	})
	.refine(
		(val) => {
			/*
			 * Indicates that paidAt is set and is after postAt.
			 */
			const paidAfterPost =
				val.paidAt &&
				val.postAt &&
				Date.parse(val.paidAt) >= Date.parse(val.postAt);

			return (
				val.paidAt === null ||
				val.paidAt === '' ||
				!val.postAt ||
				// Date.parse(val.postAt) <= Date.parse(val.paidAt)
				paidAfterPost
			);
		},
		{
			path: ['paidAt'],
			message: 'Payment date is before post date',
		},
	);

export type LeaseInvoiceWarnSchema = z.infer<typeof leaseInvoiceWarnSchema>;
