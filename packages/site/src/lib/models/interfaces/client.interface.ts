import trpc from '$lib/client/trpc';
import { getName } from '$lib/utils/common';
import { digitsOnly, falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import type { IEntity } from '$models/interfaces/entity.interface';
import { z } from 'zod';

export const schema = z.object({
	id: z.string().uuid().optional(),
	firstName: z.string().min(2, { message: 'Required' }).transform(trim),
	lastName: z.string().min(2, { message: 'Required' }).transform(trim),
	email: z
		.union([z.null(), z.literal(''), z.string().email()])
		.transform(falsyToNull),
	phone: z
		.union([
			z.null(),
			z.literal(''),
			z
				.string()
				.refine((val) => val.trim().length === 8, {
					message: 'Phone number must be 8 digits',
				})
				.refine(digitsOnly, {
					message: 'Phone must contain only numbers',
				}),
		])
		.transform(trim)
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
	dob: z
		.union([z.null(), z.literal(''), z.preprocess(strToDate, z.date())])
		.transform(falsyToNull),
});

const getOptions = async () => {
	const result = await trpc.query('clients:list', {
		size: 20,
	});
	const options = result.data.map((item) => ({
		value: item.id,
		label: getLabel(item),
	}));
	return options;
};

const ClientModelBase: IEntity<'clients'> = {
	name: 'clients',
	singular: 'client',
	singularCap: 'Client',
	plural: 'clients',
	pluralCap: 'Clients',
	defaultForm: () => ({
		firstName: '',
		lastName: '',
		phone: null,
		email: null,
		civilid: null,
		dob: null,
	}),
};

interface ILabel {
	firstName: string | null;
	lastName: string | null;
}

const getLabel = (item: ILabel) => getName(item);

export const ClientModel = {
	...ClientModelBase,
	schema,
	getLabel,
	getOptions,
	basicFields: [
		'firstName',
		'lastName',
		'phone',
		'email',
		'civilid',
		'dob',
	] as const,
};
