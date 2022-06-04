import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Field } from '$lib/models/classes/Field.class.js';
import { toDateInput } from '$lib/utils/common.js';
import type { Client as PClient } from '@prisma/client';
import * as R from 'remeda';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/client.schema.js';
import { Entity } from './entity.class.js';

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

	defaultForm = (): Record<
		keyof Omit<z.input<typeof baseSchema>, 'id'>,
		any
	> => ({
		fullName: '',
		shortName: '',
		phone: null,
		email: null,
		civilid: null,
		dob: null,
	});

	get basicFields() {
		return [
			new Field('fullName', { required: true, value: this.data?.fullName }),
			new Field('shortName', {
				value: R.pathOr(this.data, ['shortName'], ''),
				hint: 'If a short name is provided, it will be used instead of the full name in the UI.',
			}),
			new Field('email', {
				type: 'email',
				hint: "Once a client's email has been entered, you will be able to send him a portal invitation.",
				value: this.data?.email,
			}),
			new Field('phone', { value: this.data?.phone }),
			new Field('civilid', {
				label: 'Civil ID',
				value: R.pathOr(this.data, ['civilid'], ''),
			}),
			new Field('dob', {
				type: 'date',
				label: 'Date of Birth',
				value: toDateInput(R.pathOr(this.data, ['dob'], '')),
			}),
		];
	}

	public static getLabel = (item: ILabel) => item.shortName || item.fullName;

	override getLabel = () => this.data?.shortName || this.data?.fullName || '';

	static relationalFields = null;
}

interface ILabel {
	fullName: string;
	shortName: string | null;
}
