import trpc from '$lib/client/trpc';
import { concatIfExists, getName } from '$lib/utils/common';
import type { Tenant as PTenant } from '@prisma/client';
import type { z } from 'zod';
import { schema } from '../schemas/tenant.schema';
import { Entity } from './entity.class';

export class Tenant extends Entity {
	static urlName = 'tenants' as const;
	static singular = 'tenant';
	static singularCap = 'Tenant';
	static plural = 'tenants';
	static pluralCap = 'Tenants';
	static schema = schema;

	constructor(public data: Partial<PTenant>) {
		super();
	}

	static defaultForm = (): z.input<typeof schema> => ({
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

	static basicFields = [
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
	static relationalFields = [] as const;

	public static getLabel = (item: ILabel) => getName(item);
	public getLabel = () => {
		if (this.data.firstName && this.data.lastName) {
			return concatIfExists([this.data.firstName, this.data.lastName]);
		} else {
			console.warn('no firstName or lastName');
			return '';
		}
	};

	static getList = async (query?: string) => {
		try {
			const result = await trpc.query('tenants:search', {
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
		const data = await trpc.query('tenants:read', id);
		return new Tenant(data);
	}
}

interface ILabel {
	firstName: string | null;
	lastName: string | null;
}
