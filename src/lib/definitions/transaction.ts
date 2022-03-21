import type { InferMutationInput } from '$lib/client/trpc';
import { falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import { z } from 'zod';
import type { EntityDefinition } from '.';

export const schema = z.object({
	id: z.string().uuid().optional(),
	dueDate: z.preprocess(strToDate, z.date()),
	isPaid: z.boolean(),
	amount: z.number().gt(0),
	memo: z.string().transform(trim).transform(falsyToNull).nullish(),
	leaseId: z.string().uuid(),
	// TODO use z.url()?
	receiptUrl: z.string().transform(trim).transform(falsyToNull).nullish(),
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
