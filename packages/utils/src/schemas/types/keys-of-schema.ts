import type { KeysOfUnion } from 'src/keys-of-union';
import type { z } from 'zod';

/**
 * Extracts keys from a Zod schema.
 */
export type KeyOfSchema<T extends z.ZodTypeAny> = T extends z.ZodType<infer O>
	? KeysOfUnion<O>
	: never;

/**
 * Extracts keys from a Zod schema.
 */
export type KeyOfSchemaIntersection<T extends z.ZodTypeAny> =
	T extends z.ZodType<infer O> ? keyof O : never;

export const keysOfSchema = <T extends z.AnyZodObject>(
	schema: T,
): KeyOfSchema<T> => schema.keyof().options;
