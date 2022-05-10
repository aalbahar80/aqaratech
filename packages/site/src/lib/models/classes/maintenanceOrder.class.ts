import { Entity } from '$lib/models/classes/entity.class.js';
import type { EntityTitle } from '$lib/models/types/entity.type.js';
import { parseRelationOptions } from '$lib/utils/getRelationOptions.js';
import type { MaintenanceOrder as PMaintenanceOrder } from '@prisma/client';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/maintenanceOrder.schema.js';

export class MaintenanceOrder extends Entity {
	static urlName = 'maintenanceOrders' as EntityTitle;
	static entity = 'maintenanceOrders' as const;
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
			| undefined
			// | InferQueryOutput<'maintenanceOrders:basic'>
			// | InferQueryOutput<'maintenanceOrders:list'>['data'][number]
			| Partial<PMaintenanceOrder>,
		public urlName = MaintenanceOrder.urlName,
		public entity = 'maintenanceOrders' as const,
		public singular = 'maintenanceOrder',
		public singularCap = 'MaintenanceOrder',
		public plural = 'maintenanceOrders',
		public pluralCap = 'MaintenanceOrders',
		public schema = baseSchema,
		public override basicFields = MaintenanceOrder.basicFields,
		public override relationalFields = MaintenanceOrder.relationalFields,
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
}
