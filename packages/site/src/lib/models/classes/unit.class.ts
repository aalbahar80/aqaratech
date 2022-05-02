import trpc from '$lib/client/trpc';
import { concatIfExists } from '$lib/utils/common';
import type { Unit as PUnit } from '@prisma/client';
import type { z } from 'zod';
import { schema } from '../schemas/unit.schema';
import { Entity } from './entity.class';

export class Unit extends Entity {
	static urlName = 'units';
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
	static basicFields = ['area', 'block', 'street', 'number'] as const;
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
	static getList = async () => {
		const result = await trpc.query('units:list', {
			size: 20,
		});
		return result.data.map((data) => new Unit(data));
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
