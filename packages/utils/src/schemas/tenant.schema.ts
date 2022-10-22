import { z } from 'zod';
import { civilidSchema } from './utils/civilid.schema';
import { zodDateOnly } from './utils/date/zod-date-only';
import { phoneSchema } from './utils/phone.schema';
import { trim } from './utils/zod-transformers';

// TODO satisfies CreateTenant? (depends on if we add multiple schemas) from '@prisma/client', minus organizationId
export const tenantCreateSchema = z
	.object({
		fullName: z.string().min(1, { message: 'Required' }).transform(trim),
		label: z.string().nullish().transform(trim),
		phone: phoneSchema,
		dob: zodDateOnly().nullish(),
		civilid: civilidSchema,
		passportNum: z.string().transform(trim).nullish(),
		residencyNum: z.string().transform(trim).nullish(),
		nationality: z.string().transform(trim).nullish(),
		residencyEnd: zodDateOnly().nullish(),
	})
	.strict();

// updateTenantschema is the same but everything is optional
export const tenantUpdateSchema = tenantCreateSchema.partial();
