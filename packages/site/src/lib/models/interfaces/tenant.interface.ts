import trpc from '$lib/client/trpc';
import { getName } from '$lib/utils/common';
import { digitsOnly, falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import type { IEntity } from '$models/interfaces/entity.interface';
import { z } from 'zod';

export const schema = z.object({
	id: z.string().uuid().optional(),
	firstName: z.string().min(1, { message: 'Required' }).transform(trim),
	lastName: z.string().min(1, { message: 'Required' }).transform(trim),
	email: z
		.union([z.null(), z.literal(''), z.string().email()])
		.transform(falsyToNull),
	phone: z
		.string()
		.refine((val) => val.trim().length === 8, {
			message: 'Phone number must be 8 digits',
		})
		.refine(digitsOnly, {
			message: 'Phone must contain only numbers',
		})
		.transform(trim),
	dob: z
		.union([z.null(), z.literal(''), z.preprocess(strToDate, z.date())])
		.transform(falsyToNull),
	civilid: z
		.union([
			z.null(),
			z.literal(''),
			z
				.string()
				.refine((val) => val.trim().length === 12, {
					message: 'Must be 12 digits',
				})
				.refine(digitsOnly, {
					message: 'Must contain numbers only',
				}),
		])
		.transform(trim)
		.transform(falsyToNull),
	passportNum: z.string().nullable().transform(trim).transform(falsyToNull),
	residencyNum: z.string().nullable().transform(trim).transform(falsyToNull),
	nationality: z.string().nullable().transform(trim).transform(falsyToNull),
	residencyEnd: z
		.union([z.null(), z.literal(''), z.preprocess(strToDate, z.date())])
		.transform(falsyToNull),
});

const getLabel = (item: ILabel) => getName(item);

const getOptions = async ({ query }: { query?: string | undefined }) => {
	const result = await trpc.query('tenants:search', {
		query,
		size: 1000, // TODO replace this after implementing combobox search
	});
	const options = result.map((item) => ({
		value: item.id,
		label: getLabel(item),
	}));
	return options;
};

const TenantModelBase: IEntity<'tenants'> = {
	name: 'tenants',
	singular: 'tenant',
	singularCap: 'Tenant',
	plural: 'tenants',
	pluralCap: 'Tenants',
	defaultForm: () => ({
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
	}),
};

interface ILabel {
	firstName: string | null;
	lastName: string | null;
}

export const TenantModel = {
	...TenantModelBase,
	schema,
	getLabel,
	getOptions,
	basicFields: [
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
	] as const,
};
