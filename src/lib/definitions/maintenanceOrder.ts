import type { InferMutationInput } from '$lib/client/trpc';
import { falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import { z } from 'zod';
import type { EntityDefinition } from '.';

export const schema = z.object({
	id: z.string().uuid().optional(),
	title: z.string().transform(trim).transform(falsyToNull),
	description: z.string().transform(trim).transform(falsyToNull).nullish(),
	status: z.enum(['pending', 'completed', 'cancelled']).nullish(),
	completedAt: z.union([
		z.preprocess(strToDate, z.date()).transform(falsyToNull),
		z.literal('').transform(() => null),
	]),
	unitId: z.string().uuid().nullish(),
	propertyId: z.string().uuid().nullish(),
	clientId: z.string().uuid().nullish(),
});

type MaintenanceOrder = InferMutationInput<'maintenanceOrders:save'>;
const defaultForm = (): MaintenanceOrder => ({
	completedAt: '',
	title: '',
	description: '',
	status: null,
	unitId: '',
	propertyId: '',
	clientId: '',
});

const definition: EntityDefinition<'maintenanceOrders'> = {
	schema,
	defaultForm,
	label: undefined,
};

export default definition;
