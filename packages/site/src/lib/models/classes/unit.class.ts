import trpc from '$lib/client/trpc';
import { concatIfExists } from '$lib/utils/common';
import type { Unit as PUnit } from '@prisma/client';
import type { z } from 'zod';
import { schema } from '../schemas/unit.schema';
import { Entity } from './entity.class';

export class Unit extends Entity {
	static urlName = 'units' as const;
	static singular = 'unit';
	static singularCap = 'Unit';
	static plural = 'units';
	static pluralCap = 'Units';
	static schema = schema;
	constructor(public data: Partial<PUnit>) {
		super();
	}
	static defaultForm = (): z.input<typeof schema> => ({
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
	static relationalFields = ['clientId', 'propertyId'] as const;

	public static getLabel = (item: ILabel) =>
		concatIfExists([item.type, item.unitNumber]);
	public getLabel = () => {
		if (this.data.type && this.data.unitNumber) {
			return concatIfExists([this.data.type, this.data.unitNumber]);
		} else {
			console.warn('no type or unitNumber');
			return '';
		}
	};
	static getList = async (propertyId?: string) => {
		try {
			// catch error when empty string is passed
			const result = await trpc.query('units:list', {
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
		const data = await trpc.query('units:read', id);
		return new Unit(data);
	}
}

interface ILabel {
	type: string | null;
	unitNumber: string;
}
