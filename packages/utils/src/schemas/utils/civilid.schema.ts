import { z } from 'zod';
import { zodEmpty } from './zod-empty';
import { zodString } from './zod-string';
import { digitsOnly } from './zod-transformers';

const civilidSchema = zodString
	.refine((val) => val.length === 12, {
		message: 'Must be 12 digits',
	})
	.refine(digitsOnly, {
		message: 'Must contain numbers only',
	})
	.nullish();

export const civilidSchemaOptional = z.union([civilidSchema, zodEmpty]);
