import { zodIsDate } from '$lib/utils/zod-validators';
import { digitsOnly, falsyToNull, trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

export const schema = z.object({
	fullName: z.string().min(1, { message: 'Required' }).transform(trim),
	label: z.string().nullable().transform(trim).transform(falsyToNull),
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
	dob: zodIsDate(),
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
	residencyEnd: zodIsDate(),
});
