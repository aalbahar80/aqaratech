import type { KeysOfUnion } from 'src/keys-of-union';
import type { z } from 'zod';

/**
 * Extracts keys from a Zod schema.
 *
 * Uses `schema.keyof().options` to get the keys.
 */
export type KeysOfSchema<T extends z.ZodTypeAny> = T extends z.ZodType<infer O>
	? KeysOfUnion<O>
	: never;

export type KeysOfSchemaIntersection<T extends z.ZodTypeAny> =
	T extends z.ZodType<infer O> ? keyof O : never;

export const keysOfSchema = <T extends z.AnyZodObject>(
	schema: T,
): KeysOfSchema<T> => schema.keyof().options;
