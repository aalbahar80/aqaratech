import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Client } from '$lib/models/classes/client.class.js';
import { Property } from '$lib/models/classes/property.class.js';
import type { RelationOptions } from '$lib/models/interfaces/option.interface';
import { getUnitLabel } from '$lib/utils/common.js';
import type { Unit as PUnit } from '@prisma/client';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/unit.schema.js';
import { Entity } from './entity.class.js';

export class Unit extends Entity {
	static urlName = 'units' as const;
	static singular = 'unit';
	static singularCap = 'Unit';
	static plural = 'units';
	static pluralCap = 'Units';
	static schema = baseSchema;
	static relationalFields = ['clientId', 'propertyId'] as const;
	static basicFields = [
		'type',
		'unitNumber',
		'bed',
		'bath',
		'size',
		'marketRent',
		'floor',
		'usage',
	] as const;

	constructor(
		public data?:
			| InferQueryOutput<'units:basic'>
			| InferQueryOutput<'units:read'>
			| Partial<PUnit>
			| InferQueryOutput<'units:list'>['data'][number],
		public urlName = Unit.urlName,
		public singular = 'unit',
		public singularCap = 'Unit',
		public plural = 'units',
		public pluralCap = 'Units',
		public schema = baseSchema,
		public override relationalFields = Unit.relationalFields,
		public override basicFields = Unit.basicFields,
	) {
		super();
	}
	defaultForm = (): z.input<typeof baseSchema> => ({
		unitNumber: '',
		bed: null,
		bath: null,
		size: null,
		marketRent: null,
		floor: null,
		usage: null,
		type: null,
		propertyId: '',
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
		if (data && 'property' in data) {
			options.property = new Property(data.property).toOption();
			options.client = new Client(data.property.client).toOption();
		}
		return options;
	};

	public static getLabel = (item: ILabel) => getUnitLabel(item);

	override getLabel = () => {
		return this.data ? getUnitLabel(this.data) : '';
	};

	static getParentFilter = (id: string) => ({
		propertyId: id,
	});
}

interface ILabel {
	type: string | null;
	unitNumber: string;
}
