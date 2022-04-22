import { falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import type { IEntity } from '$models/interfaces/entity.interface';
import { z } from 'zod';

const schema = z.object({
	id: z.string().uuid().optional(),
	title: z.string().transform(trim).transform(falsyToNull),
	description: z.string().transform(trim).transform(falsyToNull).nullable(),
	status: z.enum(['pending', 'completed', 'closed']).nullable(),
	completedAt: z
		.union([
			z.preprocess(strToDate, z.date()).transform(falsyToNull),
			z.literal('').transform(() => null),
		])
		.nullable(),
	propertyId: z.string().uuid().nullable(),
	clientId: z.string().uuid().nullable(),
	unitId: z.string().uuid().nullable(),
});

const withAttribution = schema.superRefine((val, ctx) => {
	if (
		+Boolean(val.unitId) + +Boolean(val.propertyId) + +Boolean(val.clientId) !==
		1
		// Boolean(val.clientId)
	) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['clientId'],
			message: 'At least one of unit, property, or client must be selected.',
		});
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['propertyId'],
			message: 'At least one of unit, property, or client must be selected.',
		});
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['unitId'],
			message: 'At least one of unit, property, or client must be selected.',
		});
	}
});

const MaintenanceOrderModelBase: IEntity<'maintenanceOrders'> = {
	name: 'maintenanceOrders',
	singular: 'maintenanceOrder',
	singularCap: 'Maintenance Order',
	plural: 'maintenanceOrders',
	pluralCap: 'Maintenance Orders',
	defaultForm: () => ({
		completedAt: '',
		title: '',
		description: '',
		status: null,
		unitId: null,
		propertyId: null,
		clientId: null,
	}),
};

export const MaintenanceOrderModel = {
	...MaintenanceOrderModelBase,
	schema: withAttribution,
	basicFields: ['title', 'description', 'status', 'completedAt'] as const,
};
