import type { InferMutationInput } from '$lib/client/trpc';
import { getName } from '$lib/utils/common';
import { falsyToNull, trim } from '$lib/zodTransformers';
import { z } from 'zod';
import type { EntityDefinition } from '.';

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
	dob: z
		.preprocess((arg) => {
			if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
			return;
		}, z.date())
		.or(z.literal(''))
		.nullish()
		.transform(falsyToNull),
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
	passportNum: z.string().transform(trim).transform(falsyToNull).nullish(),
	residencyNum: z.string().transform(trim).transform(falsyToNull).nullish(),
	nationality: z.string().transform(trim).transform(falsyToNull).nullish(),
	residencyEnd: z
		.preprocess((arg) => {
			if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
			return;
		}, z.date())
		.or(z.literal(''))
		.nullish()
		.transform(falsyToNull),
});

type Tenant = InferMutationInput<'tenants:save'>;
const defaultForm = (): Tenant => ({
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

const label: typeof definition['label'] = (item) => getName(item);

const definition: EntityDefinition<'tenants'> = { schema, defaultForm, label };

export default definition;
