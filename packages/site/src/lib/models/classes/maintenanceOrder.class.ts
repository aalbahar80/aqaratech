import { Entity } from '$lib/models/classes/entity.class.js';
import { Field } from '$lib/models/classes/Field.class.js';
import { toDateInput } from '$lib/utils/common.js';
import { parseRelationOptions } from '$lib/utils/getRelationOptions.js';
import type { MaintenanceOrder as PMaintenanceOrder } from '@prisma/client';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/maintenanceOrder.schema.js';

export class MaintenanceOrder extends Entity {
	static urlName = 'maintenanceOrders' as const;
	static entity = 'maintenanceOrders' as const;
	static singular = 'maintenanceOrder';
	static singularCap = 'MaintenanceOrder';
	static plural = 'maintenanceOrders';
	static pluralCap = 'MaintenanceOrders';
	static schema = baseSchema;
	public attribution: string | undefined = undefined;
	static relationalFields = ['clientId', 'propertyId', 'unitId'] as const;

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
		public override relationalFields = MaintenanceOrder.relationalFields,
	) {
		super();
	}

	override basicFields = [
		new Field('title', {
			required: true,
			value: this.data?.title,
		}),
		new Field('description', {
			value: this.data?.description,
		}),
		new Field('status', {
			type: 'select',
			required: true,
			// options: [
			// 	{ label: '', value: null },
			// 	{ label: 'Pending', value: 'pending' },
			// 	{ label: 'Completed', value: 'completed' },
			// 	{ label: 'Closed', value: 'closed' },
			// ],
			value: this.data?.status,
		}),
		new Field('completedAt', {
			type: 'date',
			value: toDateInput(this.data?.completedAt),
			label: 'Completion Date',
		}),
	];

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
