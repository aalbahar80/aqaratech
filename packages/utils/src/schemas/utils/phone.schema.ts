import { z } from 'zod';
import { digitsOnly, trim } from './zodTransformers';

export const phoneSchema = z
	.string()
	.transform(trim)
	.refine((val) => val.trim().length === 8, {
		message: 'Phone number must be 8 digits',
	})
	.refine(digitsOnly, {
		message: 'Phone must contain only numbers',
	})
	.nullish();
