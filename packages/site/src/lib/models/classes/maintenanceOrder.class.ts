import { trpc, type InferQueryOutput } from '$lib/client/trpc';
import { Client } from '$lib/models/classes/client.class';
import { Entity } from '$lib/models/classes/entity.class';
import { Property } from '$lib/models/classes/property.class';
import { Unit } from '$lib/models/classes/unit.class';
import type { RelationOptions } from '$lib/models/interfaces/option.interface';
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
	public attribution: string | undefined = undefined;

	constructor(
		public data:
			| InferQueryOutput<'maintenanceOrders:basic'>
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

	override getRelationOptions = (data = this.data) => {
		const relations: RelationOptions = {
			client: undefined,
			property: undefined,
			unit: undefined,
			tenant: undefined,
			lease: undefined,
		};
		if ('unit' in data && data.unit) {
			this.attribution = data.unit?.id;
			relations.unit = new Unit(data.unit).toOption();
			relations.property = new Property(data.unit.property).toOption();
			relations.client = new Client(data.unit.property.client).toOption();
		} else if ('property' in data && data.property) {
			this.attribution = data.property?.id;
			relations.property = new Property(data.property).toOption();
			relations.client = new Client(data.property.client).toOption();
		} else if ('client' in data && data.client) {
			this.attribution = data.client?.id;
			relations.client = new Client(data.client).toOption();
		}
		return relations;
	};

	static getList = async () => {
		const result = await trpc().query('maintenanceOrders:list', { size: 20 });
		return result.data.map((data) => new MaintenanceOrder(data));
	};
	static async grab(id: string) {
		const data = await trpc().query('maintenanceOrders:read', id);
		return new MaintenanceOrder(data);
	}
}
