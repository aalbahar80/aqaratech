import type { InferMutationInput } from '$lib/client/trpc';
import { falsyToNull, trim } from '$lib/zodTransformers';
import { z } from 'zod';
import type { EntityDefinition } from '.';

export const schema = z.object({
	id: z.string().uuid().optional(),
	title: z.string().transform(trim).transform(falsyToNull),
	description: z.optional(z.string().transform(trim).transform(falsyToNull)),
	status: z.enum(['pending', 'completed', 'cancelled']).nullish(),
	completedAt: z
		.preprocess((arg) => {
			if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
		}, z.date())
		// use nullish?
		.or(z.literal(''))
		.transform(falsyToNull),
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
