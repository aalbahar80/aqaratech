import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Client } from '$lib/models/classes/client.class.js';
import { Property } from '$lib/models/classes/property.class.js';
import { Tenant } from '$lib/models/classes/tenant.class.js';
import { Unit } from '$lib/models/classes/unit.class.js';
import type { RelationOptions } from '$lib/models/interfaces/option.interface';
import {
	leaseFormSchema as extendedSchema,
	schema as baseSchema,
} from '../schemas/lease.schema.js';
import type { Lease as PLease } from '@prisma/client';
import { addMonths, format } from 'date-fns';
import { nanoid } from 'nanoid';
import type { z } from 'zod';
import { Entity } from './entity.class.js';

export class Lease extends Entity {
	static urlName = 'leases' as const;
	static singular = 'lease';
	static singularCap = 'Lease';
	static plural = 'leases';
	static pluralCap = 'Leases';
	static schema = baseSchema;
	static leaseFormSchema = extendedSchema;
	static relationalFields = [
		'clientId',
		'propertyId',
		'unitId',
		'tenantId',
	] as const;
	static basicFields = [
		'monthlyRent',
		'start',
		'end',
		'notify',
		'deactivated',
	] as const;

	constructor(
		public data?: InferQueryOutput<'leases:basic'> | Partial<PLease>,
		public urlName = Lease.urlName,
		public singular = 'lease',
		public singularCap = 'Lease',
		public plural = 'leases',
		public pluralCap = 'Leases',
		public schema = baseSchema,
		public leaseFormSchema = extendedSchema,
		public override relationalFields = Lease.relationalFields,
		public override basicFields = Lease.basicFields,
	) {
		super();
	}

	defaultForm = (): z.input<typeof extendedSchema> => ({
		start: new Date(),
		end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
		monthlyRent: 0,
		tenantId: '',
		unitId: '',
		notify: true,
		deactivated: false,
		schedule: Lease.generateSchedule({
			count: 12,
			amount: 0,
			scheduleStart: new Date(),
		}),
	});

	override getRelationOptions = () => {
		const data = this.data;
		const options: RelationOptions = {
			client: undefined,
			property: undefined,
			unit: undefined,
			tenant: undefined,
			lease: undefined,
		};

		if (data && 'tenant' in data) {
			options.tenant = new Tenant(data.tenant).toOption();
		}
		if (data && 'unit' in data) {
			options.unit = new Unit(data.unit).toOption();
			options.property = new Property(data.unit.property).toOption();
			options.client = new Client(data.unit.property.client).toOption();
		}
		return options;
	};

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
