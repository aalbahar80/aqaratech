import type { InferMutationInput } from '$lib/client/trpc';
import { concatIfExists } from '$lib/utils/table-utils';
import { falsyToNull, trim } from '$lib/zodTransformers';
import { z } from 'zod';
import type { EntityDefinition } from '.';

export const schema = z.object({
	id: z.string().optional(),
	area: z
		.string()
		.min(1, { message: 'Required' })
		.transform(trim)
		.transform(falsyToNull),
	block: z
		.string()
		.min(1, { message: 'Required' })
		.refine((val) => val.length === 0 || val.match(/^[0-9]+$/) !== null, {
			message: 'Block must contain only numbers',
		})
		.transform(trim)
		.transform(falsyToNull),
	street: z
		.string()
		.min(1, { message: 'Required' })
		.transform(trim)
		.transform(falsyToNull),
	avenue: z.string().optional(),
	number: z
		.string()
		.min(1, { message: 'Required' })
		.transform(trim)
		.transform(falsyToNull),
});

type Property = InferMutationInput<'properties:save'>;
const defaultForm = (): Property => ({
	area: '',
	block: '',
	avenue: '',
	street: '',
	number: '',
});

const label: typeof definition['label'] = (item) =>
	concatIfExists([item.block, item.block]);

const definition: EntityDefinition<'properties'> = {
	schema,
	defaultForm,
	label,
};

export default definition;
