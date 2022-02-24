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
		.transform(falsyToNull)
		.refine((val) => val && val.length > 0),
	bed: z.number().nonnegative().nullish().transform(falsyToNullExceptZero),
	bath: z.number().nonnegative().nullish().transform(falsyToNullExceptZero),
	size: z.number().nonnegative().nullish().transform(falsyToNullExceptZero),
	floor: z.optional(z.string().transform(trim).transform(falsyToNull)),
	usage: z.optional(z.string().transform(trim).transform(falsyToNull)),
	type: z.optional(z.string().transform(trim).transform(falsyToNull)),
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
	floor: '',
	usage: '',
	type: '',
	propertyId: '',
});

const label: typeof definition['label'] = (item) => item.unitNumber || item.id;

const definition: EntityDefinition<'units'> = { schema, defaultForm, label };

export default definition;
