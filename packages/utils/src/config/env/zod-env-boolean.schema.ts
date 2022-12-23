import { z } from 'zod';

/**
 * Makes it so that 0 and 1 are correctly parsed coerced to boolean.
 * Otherwise, '0' is coerced to true because it's a non-empty string.
 */
export const zodEnvBooleanSchema = () =>
	z.pipeline(z.coerce.number(), z.coerce.boolean());
