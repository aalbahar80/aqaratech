import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Field } from '$lib/models/classes/Field.class.js';
import { Portfolio } from '$lib/models/classes/portfolio.class.js';
import { Property } from '$lib/models/classes/property.class.js';
import { Tenant } from '$lib/models/classes/tenant.class.js';
import { Unit } from '$lib/models/classes/unit.class.js';
import type { RelationOptions } from '$lib/models/interfaces/option.interface';
import { toDateInput, toUTCFormat } from '$lib/utils/common.js';
import type { Lease as PLease } from '@prisma/client';
import type { UpdateLeaseDto } from '@self/sdk';
import { addYears } from 'date-fns';
import { nanoid } from 'nanoid';
import type { z } from 'zod';
import {
	leaseFormSchema as extendedSchema,
	schema as baseSchema,
} from '../schemas/lease.schema.js';
import { Entity, type UpdateForm } from './entity.class.js';

export class Lease extends Entity {
	static urlName = 'leases' as const;
	static singular = 'lease';
	static singularCap = 'Lease';
	static plural = 'leases';
	static pluralCap = 'Leases';
	static schema = baseSchema;
	static leaseFormSchema = extendedSchema;
	static relationalFields = [
		'portfolioId',
		'propertyId',
		'unitId',
		'tenantId',
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
	) {
		super();
	}

	update = async (form: UpdateForm<UpdateLeaseDto>) => {
		const data = await form.api.leases.update({
			id: form.id,
			updateLeaseDto: form.values,
		});
		return { redirectTo: `/${this.urlName}/${form.id}`, data };
	};

	defaultForm = (): Record<keyof Omit<z.input<typeof baseSchema>, 'id'>, any> &
		z.input<typeof extendedSchema> => ({
		start: new Date(),
		end: addYears(new Date(), 1),
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

	get basicFields() {
		return [
			new Field('monthlyRent', {
				type: 'number',
				required: true,
				value: this.data?.monthlyRent,
			}),
			new Field('start', {
				type: 'date',
				required: true,
				value: toDateInput(this.data?.start),
			}),
			new Field('end', {
				type: 'date',
				required: true,
				value: toDateInput(this.data?.start),
			}),
			new Field('notify', {
				type: 'checkbox',
				value: this.data?.notify,
			}),
			new Field('deactivated', {
				type: 'checkbox',
				value: this.data?.deactivated,
			}),
		];
	}

	override getRelationOptions = () => {
		const data = this.data;
		const options: RelationOptions = {
			portfolio: undefined,
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
			options.portfolio = new Portfolio(
				data.unit.property.portfolio,
			).toOption();
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
		const start = scheduleStart;
		for (let bp = 0; bp < Math.min(count, 24); bp++) {
			const postAt = Date.UTC(
				start.getUTCFullYear(),
				start.getUTCMonth() + bp,
				start.getUTCDate(),
				start.getUTCHours(),
				start.getUTCMinutes(),
				start.getUTCSeconds(),
			);
			console.log(new Date(postAt), 'postAt');
			const memo = `Rent for: ${toUTCFormat(new Date(postAt), 'MMMM yyyy')}`;
			newSchedule.push({
				nanoid: nanoid(),
				amount,
				postAt,
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
