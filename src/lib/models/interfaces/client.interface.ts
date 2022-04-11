import type { InferQueryOutput } from '$lib/client/trpc';
import { getName } from '$lib/utils/common';
import { falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import type { IEntity, Searchable } from '$models/interfaces/entity.interface';
import { z } from 'zod';

export const schema = z.object({
	id: z.string().uuid().optional(),
	firstName: z.string().min(1, { message: 'Required' }).transform(trim),
	lastName: z.string().min(1, { message: 'Required' }).transform(trim),
	email: z.string().email().or(z.literal('')).transform(falsyToNull),
	phone: z
		.string()
		.min(8)
		.and(z.string().max(8))
		.transform(trim)
		.refine((val) => val.length === 0 || val.match(/^[0-9]+$/) !== null, {
			message: 'Phone must contain only numbers',
		}),
	civilid: z
		.string()
		.min(12)
		.and(z.string().max(12))
		.or(z.literal(''))
		.refine((val) => val.length === 0 || val.match(/^[0-9]+$/) !== null, {
			message: 'Civil ID must contain only numbers',
		})
		.transform(trim)
		.transform(falsyToNull),
	dob: z.union([
		z.preprocess(strToDate, z.date()).transform(falsyToNull),
		z.literal('').transform(() => null),
	]),
});

interface IClient<T extends 'clients'>
	extends IEntity<T, typeof schema>,
		Searchable<T> {
	getLabel: (item: InferQueryOutput<`${T}:search`>[number]) => string;
}

export const ClientModel: IClient<'clients'> = {
	singular: 'property',
	plural: 'clients',
	schema,
	defaultForm: () => ({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		civilid: '',
		dob: '',
	}),
	getLabel: (item) => getName(item),
};
