import { z } from 'zod';

import { nullifyEmptyString } from './zod-nullify-empty-string';

/**
 * Empty strings will be preprocessed to null before validation starts.
 *
 * Output will be trimmed.
 */
export const zodString = z.preprocess(
	nullifyEmptyString,
	z.string().trim().min(1, { message: 'Required' }),
);

/**
 * Empty strings will be preprocessed to null before validation starts.
 *
 * Output will be trimmed.
 */
export const zodStringOptional = z.preprocess(
	nullifyEmptyString,
	z.string().trim().min(1, { message: 'Required' }).nullish(),
);
