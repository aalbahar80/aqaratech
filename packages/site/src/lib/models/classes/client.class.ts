import { trpc, type InferQueryOutput } from '$lib/client/trpc';
import { concatIfExists, getName } from '$lib/utils/common';
import type { Client as PClient } from '@prisma/client';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/client.schema';
import { Entity } from './entity.class';

export class Client extends Entity {
	static urlName = 'clients' as const;
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

	static getList = async () => {
		const result = await trpc().query('clients:list', {
			size: 1000,
		});
		return result.data.map((data) => new Client(data));
	};

	static async grab(id: string) {
		const data = await trpc().query('clients:read', id);
		return new Client(data);
	}
	static relationalFields = null;
}

interface ILabel {
	firstName: string | null;
	lastName: string | null;
}
