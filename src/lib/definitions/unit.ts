import type { InferMutationInput } from '$lib/client/trpc';
import { concatIfExists } from '$lib/utils/common';
import {
	falsyToNull,
	falsyToNullExceptZero,
	trim,
	undefinedToNull,
} from '$lib/zodTransformers';
import { z } from 'zod';
import type { EntityDefinition } from '.';

export const schema = z.object({
	id: z.string().uuid().optional(),
	unitNumber: z
		.string()
		.min(1)
		.transform(trim)
		.refine((val) => val && val.length > 0),
	bed: z
		.number()
		.min(1)
		.nullish()
		.transform((val) => (val === undefined ? null : val)),
	bath: z
		.number()
		.min(1)
		.nullish()
		.transform((val) => (val === undefined ? null : val)),
	size: z
		.number()
		.min(1)
		.nullish()
		.transform((val) => (val === undefined ? null : val)),
	floor: z.number().nullish().transform(falsyToNullExceptZero),
	usage: z.string().transform(trim).transform(falsyToNull).nullable(),
	type: z.string().transform(trim).transform(falsyToNull).nullable(),
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

export const getLabel = <
	T extends {
		type: string | null;
		unitNumber: string | null;
	},
>(
	item: T,
) => concatIfExists([item.type, item.unitNumber]);

const label: typeof definition['label'] = (item) => getLabel(item);

const definition: EntityDefinition<'units'> = { schema, defaultForm, label };

export default definition;
