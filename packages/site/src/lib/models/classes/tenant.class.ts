import { trpc, type InferQueryOutput } from '$lib/client/trpc';
import { concatIfExists, getName } from '$lib/utils/common';
import type { Tenant as PTenant } from '@prisma/client';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/tenant.schema';
import { Entity } from './entity.class';

export class Tenant extends Entity {
	static urlName = 'tenants' as const;
	static singular = 'tenant';
	static singularCap = 'Tenant';
	static plural = 'tenants';
	static pluralCap = 'Tenants';
	static schema = baseSchema;

	constructor(
		public data:
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
		if (this.data.firstName && this.data.lastName) {
			return concatIfExists([this.data.firstName, this.data.lastName]);
		} else {
			console.warn('no firstName or lastName');
			return '';
		}
	};

	static getList = async (query?: string) => {
		try {
			const result = await trpc().query('tenants:search', {
				query,
				size: 1000, // TODO replace this after implementing combobox search
			});
			return result.map((data) => new Tenant(data));
		} catch (error) {
			console.error(error);
			return [];
		}
	};

	static async grab(id: string) {
		const data = await trpc().query('tenants:read', id);
		return new Tenant(data);
	}
}

interface ILabel {
	firstName: string | null;
	lastName: string | null;
}
