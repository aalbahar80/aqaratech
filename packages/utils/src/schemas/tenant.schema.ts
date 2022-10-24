import { z } from 'zod';
import { civilidSchemaOptional } from './utils/civilid.schema';
import { zodDateOnlyOptional } from './utils/date/zod-date-only';
import { phoneSchemaOptional } from './utils/phone.schema';
import { zodString, zodStringOptional } from './utils/zod-string';

export const tenantCreateSchema = z
	.object({
		fullName: zodString,
		label: zodStringOptional,
		phone: phoneSchemaOptional,
		dob: zodDateOnlyOptional,
		civilid: civilidSchemaOptional,
		passportNum: zodStringOptional,
		residencyNum: zodStringOptional,
		nationality: zodStringOptional,
		residencyEnd: zodDateOnlyOptional,
	})
	.strict();

export const tenantUpdateSchema = tenantCreateSchema.partial();
