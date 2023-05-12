import type { LeaseInvoiceCreateSchema } from '../schemas';

export type RangeKind = Extract<
	keyof LeaseInvoiceCreateSchema,
	'postAt' | 'paidAt'
>;
