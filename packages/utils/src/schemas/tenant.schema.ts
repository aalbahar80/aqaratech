import { z } from 'zod';
import { civilidSchema } from './utils/civilid.schema';
import { phoneSchema } from './utils/phone.schema';
import { zodIsDateString } from './utils/zod-date-string';
import { trim } from './utils/zodTransformers';

// TODO satisfies CreateTenant? (depends on if we add multiple schemas) from '@prisma/client', minus organizationId
export const tenantCreateSchema = z
	.object({
		fullName: z.string().min(1, { message: 'Required' }).transform(trim),
		label: z.string().nullish().transform(trim),
		phone: phoneSchema,
		dob: zodIsDateString().nullish(),
		civilid: civilidSchema,
		passportNum: z.string().transform(trim).nullish(),
		residencyNum: z.string().transform(trim).nullish(),
		nationality: z.string().transform(trim).nullish(),
		residencyEnd: zodIsDateString().nullish(),
	})
	.strict();

// updateTenantschema is the same but everything is optional
export const tenantUpdateSchema = tenantCreateSchema.partial();
