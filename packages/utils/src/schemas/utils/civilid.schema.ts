import { zodString } from './zod-string';
import { digitsOnly } from './zod-transformers';

export const civilidSchema = zodString
	.refine((val) => val.length === 12, {
		message: 'Must be 12 digits',
	})
	.refine(digitsOnly, {
		message: 'Must contain numbers only',
	})
	.nullish();
