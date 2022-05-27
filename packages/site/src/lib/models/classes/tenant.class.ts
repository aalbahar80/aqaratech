import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Field } from '$lib/models/classes/Field.class.js';
import { concatIfExists, getName } from '$lib/utils/common.js';
import type { Tenant as PTenant } from '@prisma/client';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/tenant.schema.js';
import { Entity } from './entity.class.js';

export class Tenant extends Entity {
	static urlName = 'tenants' as const;
	static singular = 'tenant';
	static singularCap = 'Tenant';
	static plural = 'tenants';
	static pluralCap = 'Tenants';
	static schema = baseSchema;

	constructor(
		public data?:
			| InferQueryOutput<'tenants:basic'>
			| InferQueryOutput<'tenants:read'>
			| Partial<PTenant>
			| InferQueryOutput<'tenants:list'>['data'][number],
		public urlName = Tenant.urlName,
		public singular = 'tenant',
		public singularCap = 'Tenant',
		public plural = 'tenants',
		public pluralCap = 'Tenants',
		public schema = baseSchema,
	) {
		super();
	}

	defaultForm = (): z.input<typeof baseSchema> => ({
		firstName: '',
		lastName: '',
		dob: '',
		email: '',
		civilid: '',
		phone: '',
		nationality: '',
		passportNum: '',
		residencyNum: '',
		residencyEnd: '',
	});

	override basicFields = [
		new Field('firstName', { required: true }),
		new Field('lastName', { required: true }),
		new Field('email', {
			type: 'email',
			hint: "Adding a tenant's email unlocks (1) email payment reminders and (2) tenant portal invitations.",
		}),
		new Field('phone', {
			hint: "Adding a tenant's phone unlocks SMS payment reminders.",
		}),
		new Field('dob', { type: 'date', label: 'Date of Birth' }),
		new Field('civilid', { label: 'Civil ID' }),
		new Field('passportNum', { label: 'Passport Number' }),
		new Field('nationality'),
		new Field('residencyNum', { label: 'Residency Number' }),
		new Field('residencyEnd', { type: 'date', label: 'Residency Expiration' }),
	];

	static getLabel = (item: ILabel) => getName(item);

	override getLabel = () => {
		if (this?.data?.firstName && this.data.lastName) {
			return concatIfExists([this.data.firstName, this.data.lastName]);
		} else {
			console.warn('no firstName or lastName');
			return '';
		}
	};
}

interface ILabel {
	firstName: string | null;
	lastName: string | null;
}
