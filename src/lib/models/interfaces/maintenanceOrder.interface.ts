import { falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import type { IEntity } from '$models/interfaces/entity.interface';
import { z } from 'zod';

const schema = z.object({
	id: z.string().uuid().optional(),
	title: z.string().transform(trim).transform(falsyToNull),
	description: z.string().transform(trim).transform(falsyToNull).nullable(),
	status: z.enum(['pending', 'completed', 'cancelled']).nullable(),
	completedAt: z.union([
		z.preprocess(strToDate, z.date()).transform(falsyToNull),
		z.literal('').transform(() => null),
	]),
	unitId: z.string().uuid().or(z.literal('')).nullable().transform(falsyToNull),
	propertyId: z
		.string()
		.uuid()
		.or(z.literal(''))
		.nullable()
		.transform(falsyToNull),
	clientId: z
		.string()
		.uuid()
		.or(z.literal(''))
		.nullable()
		.transform(falsyToNull),
});

export const MaintenanceOrderModel: IEntity<
	'maintenanceOrders',
	typeof schema
> = {
	singular: 'maintenanceOrder',
	plural: 'maintenanceOrders',
	schema,
	defaultForm: () => ({
		completedAt: '',
		title: '',
		description: '',
		status: null,
		unitId: '',
		propertyId: '',
		clientId: '',
	}),
	getLabel: (item) => item.id,
};
