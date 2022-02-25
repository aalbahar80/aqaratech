import type { InferMutationInput } from '$lib/client/trpc';
import { falsyToNull, trim } from '$lib/zodTransformers';
import { z } from 'zod';
import type { EntityDefinition } from '.';

export const schema = z.object({
	id: z.string().uuid().optional(),
	dueDate: z.preprocess((arg) => {
		if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
	}, z.date()),
	isPaid: z.boolean(),
	amount: z.number().gt(0),
	memo: z.optional(z.string().transform(trim).transform(falsyToNull)),
	leaseId: z.string().uuid(),
});

type Transaction = InferMutationInput<'transactions:save'>;
const defaultForm = (): Transaction => ({
	dueDate: new Date(),
	isPaid: false,
	amount: 0,
	memo: '',
	leaseId: '',
});

const definition: EntityDefinition<'transactions'> = {
	schema,
	defaultForm,
    label: undefined,
};

export default definition;
