import type { InferMutationInput } from '$lib/client/trpc';
import { concatIfExists } from '$lib/utils/table-utils';
import { falsyToNull, trim } from '$lib/zodTransformers';
import { z } from 'zod';
import type { EntityDefinition } from '.';

export const schema = z.object({
	id: z.string().uuid().optional(),
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
	clientId: z.string().uuid(),
});

type Property = InferMutationInput<'properties:save'>;
const defaultForm = (): Property => ({
	area: '',
	block: '',
	avenue: '',
	street: '',
	number: '',
	clientId: '',
});

const label: typeof definition['label'] = (item) =>
	concatIfExists([item.area, 'قطعة', item.block, item.street, 'مبنى', '2']);

const definition: EntityDefinition<'properties'> = {
	schema,
	defaultForm,
	label,
};

export default definition;
