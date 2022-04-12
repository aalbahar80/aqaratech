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

const MaintenanceOrderModelBase: IEntity<'maintenanceOrders'> = {
	name: 'maintenanceOrders',
	singular: 'maintenanceOrder',
	plural: 'maintenanceOrders',
	defaultForm: () => ({
		completedAt: '',
		title: '',
		description: '',
		status: null,
		unitId: '',
		propertyId: '',
		clientId: '',
	}),
};

const relationalFields = ['unitId', 'propertyId', 'clientId'];

export const MaintenanceOrderModel = {
	...MaintenanceOrderModelBase,
	schema,
	relationalFields,
};
