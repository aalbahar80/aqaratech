import { trpc, type InferQueryOutput } from '$lib/client/trpc';
import { Client } from '$lib/models/classes/client.class';
import { Entity } from '$lib/models/classes/entity.class';
import { Property } from '$lib/models/classes/property.class';
import { Unit } from '$lib/models/classes/unit.class';
import type { MaintenanceOrder as PMaintenanceOrder } from '@prisma/client';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/maintenanceOrder.schema';

export class MaintenanceOrder extends Entity {
	static urlName = 'maintenanceOrders' as const;
	static singular = 'maintenanceOrder';
	static singularCap = 'MaintenanceOrder';
	static plural = 'maintenanceOrders';
	static pluralCap = 'MaintenanceOrders';
	static schema = baseSchema;

	constructor(
		public data:
			| InferQueryOutput<'maintenanceOrders:basic'>
			| InferQueryOutput<'maintenanceOrders:read'>
			| InferQueryOutput<'maintenanceOrders:list'>['data'][number]
			| Partial<PMaintenanceOrder>,
		public urlName = MaintenanceOrder.urlName,
		public singular = 'maintenanceOrder',
		public singularCap = 'MaintenanceOrder',
		public plural = 'maintenanceOrders',
		public pluralCap = 'MaintenanceOrders',
		public schema = baseSchema,
	) {
		super();
	}

	defaultForm = (): z.input<typeof baseSchema> => ({
		completedAt: '',
		title: '',
		description: '',
		status: null,
		unitId: null,
		propertyId: null,
		clientId: null,
	});

	basicFields = ['title', 'description', 'status', 'completedAt'] as const;

	override getRelationOptions = (data: any = this.data) => {
		return {
			client: data?.client
				? new Client(data.client).toOption()
				: data.property?.client
				? new Client(data.property.client).toOption()
				: data.unit?.property?.client
				? new Client(data.unit.property.client).toOption()
				: undefined,
			property: data.property
				? new Property(data.property).toOption()
				: data.unit?.property
				? new Property(data.unit.property).toOption()
				: undefined,
			unit: data.unit ? new Unit(data.unit).toOption() : undefined,
			tenant: undefined,
			lease: undefined,
		};
	};

	// override getRelationOptions = (
	// 	data: InferQueryOutput<`maintenanceOrders:basic`>,
	// ) => {
	// 	return {
	// 		client: data?.client
	// 			? new Client(data.client).toOption()
	// 			: data.property?.client
	// 			? new Client(data.property.client).toOption()
	// 			: data.unit?.property?.client
	// 			? new Client(data.unit.property.client).toOption()
	// 			: undefined,
	// 		property: data.property
	// 			? new Property(data.property).toOption()
	// 			: data.unit?.property
	// 			? new Property(data.unit.property).toOption()
	// 			: undefined,
	// 		unit: data.unit ? new Unit(data.unit).toOption() : undefined,
	// 		tenant: undefined,
	// 		lease: undefined,
	// 	};
	// };

	static getList = async () => {
		const result = await trpc().query('maintenanceOrders:list', { size: 20 });
		return result.data.map((data) => new MaintenanceOrder(data));
	};
	static async grab(id: string) {
		const data = await trpc().query('maintenanceOrders:read', id);
		return new MaintenanceOrder(data);
	}
}
