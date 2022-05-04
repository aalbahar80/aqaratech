import trpc from '$lib/client/trpc';
import { concatIfExists, getAddress } from '$lib/utils/common';
import type { Property as PProperty } from '@prisma/client';
import type { z } from 'zod';
import { schema } from '../schemas/property.schema';
import { Entity } from './entity.class';

export class Property extends Entity {
	static urlName = 'properties' as const;
	static singular = 'property';
	static singularCap = 'Property';
	static plural = 'properties';
	static pluralCap = 'Properties';
	static schema = schema;
	constructor(public data: Partial<PProperty>) {
		super();
	}
	static defaultForm = (): Partial<z.input<typeof schema>> => ({
		area: '',
		block: '',
		avenue: '',
		street: '',
		number: '',
	});
	static basicFields = ['area', 'block', 'street', 'avenue', 'number'] as const;
	static relationalFields = ['clientId'] as const;

	public static getLabel = (item: ILabel) => getAddress(item);
	// TODO: DRY this with Entity classes once the following is fixed:
	// Problem: importing property.class in a test file breaks vscode playwright extenstion
	public getLabel = () => {
		if (this.data.area && this.data.block && this.data.number) {
			return getAddress(this.data);
			// return concatIfExists([
			// 	this.data.area,
			// 	'ق',
			// 	this.data.block,
			// 	'م',
			// 	this.data.number,
			// ]);
		} else {
			console.warn('no area or block');
			return '';
		}
	};
	static getList = async (clientId?: string) => {
		const result = await trpc.query('properties:list', {
			size: 100,
			clientId,
		});
		return result.data.map((data) => new Property(data));
	};
	static async grab(id: string) {
		const data = await trpc.query('properties:read', id);
		return new Property(data);
	}
}

interface ILabel {
	area: string | null;
	block: string | null;
	street: string | null;
	number: string | null;
}
