import type { InferQueryOutput } from '$lib/client/trpc.js';
import { unitTypeOptions } from '$lib/config/constants.js';
import { Portfolio } from '$lib/models/classes/portfolio.class.js';
import { Field, SelectField } from '$lib/models/classes/Field.class.js';
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
	static relationalFields = ['portfolioId', 'propertyId'] as const;

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
	) {
		super();
	}

	defaultForm = (): Record<
		keyof Omit<z.input<typeof baseSchema>, 'id'>,
		any
	> => ({
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

	get basicFields() {
		return [
			new SelectField('type', {
				value: this.data?.type,
				options: unitTypeOptions,
			}),
			new Field('unitNumber', { required: true, value: this.data?.unitNumber }),
			new Field('bed', { type: 'number', value: this.data?.bed }),
			new Field('bath', { type: 'number', value: this.data?.bath }),
			new Field('size', { type: 'number', value: this.data?.size }),
			new Field('marketRent', { type: 'number', value: this.data?.marketRent }),
			new Field('floor', { type: 'number', value: this.data?.floor }),
			new Field('usage', { value: this.data?.usage }),
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
		if (data && 'property' in data) {
			options.property = new Property(data.property).toOption();
			options.portfolio = new Portfolio(data.property.portfolio).toOption();
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
