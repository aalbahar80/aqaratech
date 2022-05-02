import trpc from '$lib/client/trpc';
import type { Lease as PLease } from '@prisma/client';
import type { z } from 'zod';
import { generateSchedule } from '../interfaces/lease.interface';
import { leaseFormSchema, schema } from '../schemas/lease.schema';
import { Entity } from './entity.class';

export class Lease extends Entity {
	static urlName = 'leases';
	static singular = 'lease';
	static singularCap = 'Lease';
	static plural = 'leases';
	static pluralCap = 'Leases';
	static schema = schema;

	constructor(public data: Partial<PLease>) {
		super();
	}

	static defaultForm = (): z.input<typeof leaseFormSchema> => ({
		start: new Date(),
		end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
		monthlyRent: 0,
		tenantId: '',
		unitId: '',
		shouldNotify: true,
		active: true,
		schedule: generateSchedule({
			count: 12,
			amount: 0,
			scheduleStart: new Date(),
		}),
	});

	static basicFields = ['unit', 'client'] as const;
	public static getLabel = (item: { id: string }) => item.id;

	public getLabel = () => {
		if (this.data.id) {
			return this.data.id;
		} else {
			console.warn('no id');
			return '';
		}
	};

	static getList = async () => {
		const result = await trpc.query('leases:search', {});
		return result.map((data) => new Lease(data));
	};

	static async grab(id: string) {
		const data = await trpc.query('leases:read', id);
		return new Lease(data);
	}
}
