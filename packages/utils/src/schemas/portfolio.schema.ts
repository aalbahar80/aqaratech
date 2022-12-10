import { z } from 'zod';

import { civilidSchemaOptional } from './utils/civilid.schema';
import { zodDateOnlyOptional } from './utils/date/zod-date-only';
import { phoneSchemaOptional } from './utils/phone.schema';
import { zodString, zodStringOptional } from './utils/zod-string';

export const portfolioCreateSchema = z
	.object({
		fullName: zodString,
		label: zodStringOptional,
		phone: phoneSchemaOptional,
		civilid: civilidSchemaOptional,
		dob: zodDateOnlyOptional,
	})
	.strict();

export const portfolioUpdateSchema = portfolioCreateSchema.partial();

// Export types

export type PortfolioCreateSchema = z.infer<typeof portfolioCreateSchema>;

export type PortfolioUpdateSchema = z.infer<typeof portfolioUpdateSchema>;
