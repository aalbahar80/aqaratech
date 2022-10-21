import { z } from 'zod';
import { digitsOnly, trim } from './utils/zodTransformers';

// TODO satisfies CreateTenant? (depends on if we add multiple schemas) from '@prisma/client', minus organizationId
export const tenantCreateSchema = z.object({
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
	residencyEnd: z.string().nullish(), // TODO: add date validator
});

// updateTenantschema is the same but everything is optional
export const tenantUpdateSchema = tenantCreateSchema.partial();
