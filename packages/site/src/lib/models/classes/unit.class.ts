import { trpc, type InferQueryOutput } from '$lib/client/trpc';
import { Client } from '$lib/models/classes/client.class';
import { Property } from '$lib/models/classes/property.class';
import { concatIfExists, getUnitLabel } from '$lib/utils/common';
import type { Unit as PUnit } from '@prisma/client';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/unit.schema';
import { Entity } from './entity.class';

export class Unit extends Entity {
	static urlName = 'units' as const;
	static singular = 'unit';
	static singularCap = 'Unit';
	static plural = 'units';
	static pluralCap = 'Units';
	static schema = baseSchema;

	constructor(
		public data:
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
	basicFields = [
		'type',
		'unitNumber',
		'bed',
		'bath',
		'size',
		'marketRent',
		'floor',
		'usage',
	] as const;
	override relationalFields = ['clientId', 'propertyId'] as const;

	override getRelationOptions = (data = this.data) => {
		console.log({ data }, 'unit.class.ts ~ 46');
		return {
			client: 'property' in data ? new Client(data.property.client).toOption() : undefined,
			property: 'property' in data ? new Property(data.property).toOption() : undefined,
			unit: undefined,
			tenant: undefined,
			lease: undefined,
		};
	};

	public static getLabel = (item: ILabel) =>
		concatIfExists([item.type, item.unitNumber]);

	public getLabel = () => {
		return getUnitLabel(this.data);
		// if (this.data.type && this.data.unitNumber) {
		// 	return concatIfExists([this.data.type, this.data.unitNumber]);
		// } else if (this.data.unitNumber) {
		// 	return this.data.unitNumber;
		// } else {
		// 	console.warn('no type or unitNumber');
		// 	return '';
		// }
	};

	static getList = async (propertyId?: string) => {
		try {
			// catch error when empty string is passed
			const result = await trpc().query('units:list', {
				size: 100,
				propertyId,
			});
			return result.data.map((data) => new Unit(data));
		} catch (error) {
			console.error(error);
			return [];
		}
	};

	static async grab(id: string) {
		const data = await trpc().query('units:read', id);
		return new Unit(data);
	}
}

interface ILabel {
	type: string | null;
	unitNumber: string;
}
