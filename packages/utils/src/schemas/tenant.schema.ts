import { z } from 'zod';
import { civilidSchema } from './utils/civilid.schema';
import { zodDateOnlyOptional } from './utils/date/zod-date-only';
import { phoneSchema } from './utils/phone.schema';
import { zodString, zodStringOptional } from './utils/zod-string';

export const tenantCreateSchema = z
	.object({
		fullName: zodString,
		label: zodStringOptional,
		phone: phoneSchema,
		dob: zodDateOnlyOptional,
		civilid: civilidSchema,
		passportNum: zodStringOptional,
		residencyNum: zodStringOptional,
		nationality: zodStringOptional,
		residencyEnd: zodDateOnlyOptional,
	})
	.strict();

export const tenantUpdateSchema = tenantCreateSchema.partial();
