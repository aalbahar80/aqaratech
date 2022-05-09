import type { InferQueryOutput } from '$lib/client/trpc.js';
import type { EntityTitle } from '$lib/models/types/entity.type.js';
import { concatIfExists, getName } from '$lib/utils/common.js';
import type { Tenant as PTenant } from '@prisma/client';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/tenant.schema.js';
import { Entity } from './entity.class.js';

export class Tenant extends Entity {
	static urlName = 'tenants' as EntityTitle;
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

	basicFields = [
		'firstName',
		'lastName',
		'email',
		'phone',
		'dob',
		'civilid',
		'passportNum',
		'nationality',
		'residencyNum',
		'residencyEnd',
	] as const;

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
