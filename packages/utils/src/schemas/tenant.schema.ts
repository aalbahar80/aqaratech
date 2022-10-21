import { z } from 'zod';
import { civilidSchema } from './utils/civilid.schema';
import { phoneSchema } from './utils/phone.schema';
import { zodIsDateOnlyOptional } from './utils/zod-validators';
import { trim } from './utils/zodTransformers';

// TODO satisfies CreateTenant? (depends on if we add multiple schemas) from '@prisma/client', minus organizationId
export const tenantCreateSchema = z
	.object({
		fullName: z.string().min(1, { message: 'Required' }).transform(trim),
		label: z.string().nullish().transform(trim),
		phone: phoneSchema,
		dob: zodIsDateOnlyOptional(),
		civilid: civilidSchema,
		passportNum: z.string().transform(trim).nullish(),
		residencyNum: z.string().transform(trim).nullish(),
		nationality: z.string().transform(trim).nullish(),
		residencyEnd: zodIsDateOnlyOptional(),
	})
	.strict();

// updateTenantschema is the same but everything is optional
export const tenantUpdateSchema = tenantCreateSchema.partial();
