import { z } from 'zod';
import { digitsOnly, trim } from './zod-transformers';

export const civilidSchema = z
	.string()
	.transform(trim)
	.refine((val) => val.length === 12, {
		message: 'Must be 12 digits',
	})
	.refine(digitsOnly, {
		message: 'Must contain numbers only',
	})
	.nullish();
