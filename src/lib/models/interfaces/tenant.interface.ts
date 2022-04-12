import trpc from '$lib/client/trpc';
import { getName } from '$lib/utils/common';
import { falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import type { IEntity } from '$models/interfaces/entity.interface';
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
	dob: z.union([
		z.preprocess(strToDate, z.date()).transform(falsyToNull),
		z.literal('').transform(() => null),
	]),
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
	passportNum: z.string().transform(trim).transform(falsyToNull).nullable(),
	residencyNum: z.string().transform(trim).transform(falsyToNull).nullable(),
	nationality: z.string().transform(trim).transform(falsyToNull).nullable(),
	residencyEnd: z.union([
		z.preprocess(strToDate, z.date()).transform(falsyToNull),
		z.literal('').transform(() => null),
	]),
});

const TenantModelBase: IEntity<'tenants'> = {
	name: 'tenants',
	singular: 'tenant',
	plural: 'tenants',
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
const getLabel = (item: ILabel) => getName(item);

const getOptions = async (query: string) => {
	const result = await trpc().query('tenants:list', {
		size: 50,
	});
	const options = result.data.map((item) => ({
		value: item.id,
		label: getLabel(item),
	}));
	return options;
};
export const TenantModel = {
	...TenantModelBase,
	schema,
	getLabel,
	getOptions,
};
