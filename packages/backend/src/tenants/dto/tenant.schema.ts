import { zodIsDateOptional } from 'src/zod/zod-validators';
import { digitsOnly, trim } from 'src/zod/zodTransformers';
import { z } from 'zod';

export const tenantSchema = z.object({
	fullName: z.string().min(1, { message: 'Required' }).transform(trim),
	label: z.string().nullish().transform(trim),
	phone: z
		.string()
		.transform(trim)
		.refine((val) => val.trim().length === 8, {
			message: 'Phone number must be 8 digits',
		})
		.refine(digitsOnly, {
			message: 'Phone must contain only numbers',
		})
		.nullish(),
	dob: z.string().nullish(), // TODO: add date validator
	civilid: z
		.string()
		.transform(trim)
		.refine((val) => val.length === 12, {
			message: 'Must be 12 digits',
		})
		.refine(digitsOnly, {
			message: 'Must contain numbers only',
		})
		.nullish(),
	passportNum: z.string().transform(trim).nullish(),
	residencyNum: z.string().transform(trim).nullish(),
	nationality: z.string().transform(trim).nullish(),
	residencyEnd: zodIsDateOptional(),
});
