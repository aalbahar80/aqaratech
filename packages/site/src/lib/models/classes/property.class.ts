import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Client } from '$lib/models/classes/client.class.js';
import type { EntityTitle } from '$lib/models/types/entity.type.js';
import { getAddress } from '$lib/utils/common.js';
import type { Property as PProperty } from '@prisma/client';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/property.schema.js';
import { Entity } from './entity.class.js';

export class Property extends Entity {
	static urlName = 'properties' as EntityTitle;
	static singular = 'property';
	static singularCap = 'Property';
	static plural = 'properties';
	static pluralCap = 'Properties';
	static schema = baseSchema;
	static relationalFields = ['clientId'] as const;
	static basicFields = ['area', 'block', 'street', 'avenue', 'number'] as const;

	constructor(
		public data?:
			| InferQueryOutput<'properties:basic'>
			| InferQueryOutput<'properties:read'>
			| Partial<PProperty>
			| InferQueryOutput<'properties:list'>['data'][number],
		public urlName = Property.urlName,
		public singular = 'property',
		public singularCap = 'Property',
		public plural = 'properties',
		public pluralCap = 'Properties',
		public schema = baseSchema,
		public override relationalFields = Property.relationalFields,
		public override basicFields = Property.basicFields,
	) {
		super();
	}

	defaultForm = (): Partial<z.input<typeof baseSchema>> => ({
		area: '',
		block: '',
		avenue: '',
		street: '',
		number: '',
	});

	override getRelationOptions = () => ({
		client:
			this.data && 'client' in this.data
				? new Client(this.data.client).toOption()
				: undefined,
		property: undefined,
		unit: undefined,
		tenant: undefined,
		lease: undefined,
	});

	public static getLabel = (item: ILabel) => getAddress(item);

	// TODO: DRY this with Entity classes once the following is fixed:
	// Problem: importing property.class in a test file breaks vscode playwright extenstion
	override getLabel = () => {
		if (this?.data?.area && this.data.block && this.data.number) {
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
}

interface ILabel {
	area: string | null;
	block: string | null;
	street: string | null;
	number: string | null;
}
