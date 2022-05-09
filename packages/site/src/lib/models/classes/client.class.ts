import type { InferQueryOutput } from '$lib/client/trpc.js';
import type { EntityTitle } from '$lib/models/types/entity.type.js';
import { concatIfExists, getName } from '$lib/utils/common.js';
import type { Client as PClient } from '@prisma/client';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/client.schema.js';
import { Entity } from './entity.class.js';

export class Client extends Entity {
	static urlName = 'clients' as EntityTitle;
	static singular = 'client';
	static singularCap = 'Client';
	static plural = 'clients';
	static pluralCap = 'Clients';
	static schema = baseSchema;

	constructor(
		public data?:
			| InferQueryOutput<'clients:basic'>
			| InferQueryOutput<'clients:read'>
			| Partial<PClient>
			| InferQueryOutput<'clients:list'>['data'][number],
		public urlName = Client.urlName,
		public singular = 'client',
		public singularCap = 'Client',
		public plural = 'clients',
		public pluralCap = 'Clients',
		public schema = baseSchema,
	) {
		super();
	}

	defaultForm = (): z.input<typeof baseSchema> => ({
		firstName: '',
		lastName: '',
		phone: null,
		email: null,
		civilid: null,
		dob: null,
	});

	basicFields = [
		'firstName',
		'lastName',
		'phone',
		'email',
		'civilid',
		'dob',
	] as const;

	public static getLabel = (item: ILabel) => getName(item);

	override getLabel = () => {
		if (this.data?.firstName && this.data.lastName) {
			return concatIfExists([this.data.firstName, this.data.lastName]);
		} else {
			console.warn('no firstName or lastName');
			return '';
		}
	};

	static relationalFields = null;
}

interface ILabel {
	firstName: string | null;
	lastName: string | null;
}
