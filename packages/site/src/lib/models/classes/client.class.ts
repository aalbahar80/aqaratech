import trpc from '$lib/client/trpc';
import { getName } from '$lib/utils/common';
import type { Client as PClient } from '@prisma/client';
import { schema } from '../schemas/client.schema';
import { Entity } from './entity.class';

export class Client extends Entity<typeof schema> {
	static urlName = 'clients';
	static singular = 'client';
	static singularCap = 'Client';
	static plural = 'clients';
	static pluralCap = 'Clients';
	schema = schema;
	data?: PClient;

	constructor() {
		super();
	}

	public defaultForm = () => ({
		firstName: '',
		lastName: '',
		phone: null,
		email: null,
		civilid: null,
		dob: null,
	});

	public basicFields = [
		'firstName',
		'lastName',
		'phone',
		'email',
		'civilid',
		'dob',
	] as const;

	public static getLabel = (item: ILabel) => getName(item);
	public getLabel = () => (this.data ? getName(this.data) : '');

	getList = async () => {
		const result = await trpc.query('clients:list', {
			size: 20,
		});
		return result.data.map((item) => this.deserialize(item));
	};

	deserialize(input: Partial<PClient>): this {
		Object.assign(this, input);
		return this;
	}

	async grab(id: string): Promise<this> {
		const client = await trpc.query('clients:read', id);
		return this.deserialize(client);
	}
}

interface ILabel {
	firstName: string | null;
	lastName: string | null;
}
