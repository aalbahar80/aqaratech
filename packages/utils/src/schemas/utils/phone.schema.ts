import { z } from 'zod';
import { nullifyEmptyString } from './zod-nullify-empty-string';
import { digitsOnly } from './zod-transformers';

export const phoneSchema = z.preprocess(
	nullifyEmptyString,
	z
		.string()
		.trim()
		.refine((val) => val.trim().length === 8, {
			message: 'Phone number must be 8 digits',
		})
		.refine(digitsOnly, {
			message: 'Phone must contain only numbers',
		})
		.nullish(),
);
