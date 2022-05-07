import { trpc } from '$lib/client/trpc';
import { Client } from '$lib/models/classes/client.class';
import { Property } from '$lib/models/classes/property.class';
import { Tenant } from '$lib/models/classes/tenant.class';
import { Unit } from '$lib/models/classes/unit.class';
import { leaseFormSchema, schema } from '$models/schemas/lease.schema';
import type {
	Client as PClient,
	Lease as PLease,
	Property as PProperty,
	Tenant as PTenant,
	Unit as PUnit,
} from '@prisma/client';
import { addMonths, format } from 'date-fns';
import { nanoid } from 'nanoid';
import type { z } from 'zod';
import { Entity } from './entity.class';

export class Lease extends Entity {
	static urlName = 'leases' as const;
	static singular = 'lease';
	static singularCap = 'Lease';
	static plural = 'leases';
	static pluralCap = 'Leases';
	static schema = schema;
	static leaseFormSchema = leaseFormSchema;

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
		schedule: Lease.generateSchedule({
			count: 12,
			amount: 0,
			scheduleStart: new Date(),
		}),
	});

	static basicFields = [
		'monthlyRent',
		'start',
		'end',
		'shouldNotify',
		'active',
	] as const;

	static relationalFields = [
		'clientId',
		'propertyId',
		'unitId',
		'tenantId',
	] as const;

	static override getRelationOptions = (
		data: PLease & {
			tenant: PTenant;
			unit: PUnit & { property: PProperty & { client: PClient } };
		},
	) => ({
		client: new Client(data?.unit?.property?.client).toOption(),
		property: new Property(data?.unit?.property).toOption(),
		unit: new Unit(data?.unit).toOption(),
		tenant: new Tenant(data?.tenant).toOption(),
	});

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
		const result = await trpc().query('leases:search', {});
		return result.map((data) => new Lease(data));
	};

	static async grab(id: string) {
		const data = await trpc().query('leases:read', id);
		return new Lease(data);
	}

	static generateSchedule({
		count,
		amount,
		scheduleStart,
	}: {
		count: number;
		amount: number;
		scheduleStart: Date;
	}) {
		const newSchedule = [];
		// get the date of the 1st day of the next month
		// const leaseStart = new Date(lease.scheduleStart);

		// Check out date-fns eachMonthOfInterval
		// https://date-fns.org/v2.28.0/docs/eachMonthOfInterval
		const nextMonth = new Date(
			scheduleStart.getFullYear(),
			scheduleStart.getMonth(),
			scheduleStart.getUTCDate() + 1,
		);

		for (let bp = 0; bp < Math.min(count, 24); bp++) {
			// TODO change to 1 month
			const dueAt = addMonths(nextMonth, bp);
			const memo = `Rent for: ${format(dueAt, 'MMMM yyyy')}`;
			newSchedule.push({
				nanoid: nanoid(),
				amount,
				// postAt: dueAt.toISOString().split('T')[0],
				postAt: dueAt,
				memo,
			});
		}
		return newSchedule;
	}

	static getBadge = (dates: { start: Date; end: Date }) => {
		if (dates.end < new Date()) {
			return {
				label: 'Expired',
				color: 'red',
			};
		}
		if (dates.start > new Date()) {
			return {
				label: 'Upcoming',
				color: 'indigo',
			};
		}
		return {
			label: 'Current',
			color: 'green',
		};
	};
}
