import {
	digitsOnly,
	falsyToNull,
	strToDate,
	trim,
} from '$lib/zodTransformers.js';
import { z } from 'zod';

export const schema = z.object({
	fullName: z.string().min(1, { message: 'Required' }).transform(trim),
	shortName: z.string().nullable().transform(trim).transform(falsyToNull),
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
