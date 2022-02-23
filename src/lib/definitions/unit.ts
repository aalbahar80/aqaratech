import type { InferMutationInput } from '$lib/client/trpc';
import { z } from 'zod';
import type { EntityDefinition } from '.';

export const schema = z.object({
	id: z.string().optional(),
});

type Unit = InferMutationInput<'units:save'>;
const defaultForm = (): Unit => ({});

const label: typeof definition['label'] = (item) => item.unitNumber || item.id;

const definition: EntityDefinition<'units'> = { schema, defaultForm, label };

export default definition;
