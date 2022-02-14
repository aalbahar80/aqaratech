import { z } from 'zod';
import type { TransactionData } from './select';

export const defaultForm: Omit<
	TransactionData,
	'id' | 'createdAt' | 'updatedAt'
> = {
	isPaid: null,
	amount: null,
	receiptUrl: null,
	memo: null,
	leaseId: null,
};

export const formSchema = z.object({
	id: z.undefined(),
	createdAt: z.undefined(),
	updatedAt: z.undefined(),
});

export default { formSchema, defaultForm };
