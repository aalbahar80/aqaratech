import type { InferMutationInput } from '$lib/client/trpc';
import { falsyToNull, falsyToNullExceptZero, trim } from '$lib/zodTransformers';
import { z } from 'zod';
import type { EntityDefinition } from '.';

export const schema = z.object({
	id: z.string().uuid().optional(),
	unitNumber: z
		.string()
		.min(1)
		.transform(trim)
		.refine((val) => val && val.length > 0),
	bed: z.number().min(1).nullish().transform(falsyToNull),
	bath: z.number().min(1).nullish().transform(falsyToNull),
	size: z.number().min(1).nullish().transform(falsyToNull),
	floor: z.number().nullish().transform(falsyToNullExceptZero),
	usage: z.string().transform(trim).transform(falsyToNull).nullish(),
	type: z.string().transform(trim).transform(falsyToNull).nullish(),
	marketRent: z
		.number()
		.nonnegative()
		.nullish()
		.transform(falsyToNullExceptZero),
	propertyId: z.string().uuid(),
});

type Unit = InferMutationInput<'units:save'>;
const defaultForm = (): Unit => ({
	unitNumber: '',
	bed: null,
	bath: null,
	size: null,
	marketRent: null,
	floor: null,
	usage: '',
	type: '',
	propertyId: '',
});

const label: typeof definition['label'] = (item) => item.unitNumber || item.id;

const definition: EntityDefinition<'units'> = { schema, defaultForm, label };

export default definition;
