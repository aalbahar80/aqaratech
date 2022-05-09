import { trpc, type InferQueryOutput } from '$lib/client/trpc';
import { Entity } from '$lib/models/classes/entity.class';
import { parseRelationOptions } from '$lib/utils/getRelationOptions';
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
	static relationalFields = ['clientId', 'propertyId', 'unitId'] as const;
	static basicFields = [
		'title',
		'description',
		'status',
		'completedAt',
	] as const;

	constructor(
		public data?:
			| InferQueryOutput<'maintenanceOrders:basic'>
			| InferQueryOutput<'maintenanceOrders:list'>['data'][number]
			| Partial<PMaintenanceOrder>,
		public urlName = MaintenanceOrder.urlName,
		public singular = 'maintenanceOrder',
		public singularCap = 'MaintenanceOrder',
		public plural = 'maintenanceOrders',
		public pluralCap = 'MaintenanceOrders',
		public schema = baseSchema,
		public override basicFields = MaintenanceOrder.basicFields,
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

	override getRelationOptions = () => {
		const parsed = parseRelationOptions(this.data);
		this.attribution = parsed.attribution;
		return parsed.options;
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
