import { trpc } from '$lib/client/trpc';
import type { MaintenanceOrder as PMaintenanceOrder } from '@prisma/client';
import type { z } from 'zod';
import { schema } from '../schemas/maintenanceOrder.schema';

export class MaintenanceOrder {
	static urlName = 'maintenanceOrders' as const;
	static singular = 'maintenanceOrder';
	static singularCap = 'MaintenanceOrder';
	static plural = 'maintenanceOrders';
	static pluralCap = 'MaintenanceOrders';
	static schema = schema;
	constructor(public data: Partial<PMaintenanceOrder>) {}
	static defaultForm = (): z.input<typeof schema> => ({
		completedAt: '',
		title: '',
		description: '',
		status: null,
		unitId: null,
		propertyId: null,
		clientId: null,
	});
	static basicFields = [
		'title',
		'description',
		'status',
		'completedAt',
	] as const;
	static relationalFields = [] as const;
	static getList = async () => {
		const result = await trpc().query('maintenanceOrders:list', { size: 20 });
		return result.data.map((data) => new MaintenanceOrder(data));
	};
	static async grab(id: string) {
		const data = await trpc().query('maintenanceOrders:read', id);
		return new MaintenanceOrder(data);
	}
}
