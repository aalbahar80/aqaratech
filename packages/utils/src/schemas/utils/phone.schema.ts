import { z } from 'zod';

import { zodEmpty } from './zod-empty';
import { zodString } from './zod-string';
import { digitsOnly } from './zod-transformers';

export const phoneSchema = zodString
	.refine((val) => val.length === 8, {
		message: 'Phone number must be 8 digits',
	})
	.refine(digitsOnly, {
		message: 'Phone must contain only numbers',
	});

export const phoneSchemaOptional = z.union([phoneSchema, zodEmpty]);
