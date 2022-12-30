import type { KeysOfUnion } from '../../keys-of-union';
import type { z } from 'zod';

/**
 * Extracts keys from a Zod schema.
 */
export type KeyOfSchema<T extends z.ZodTypeAny> = UnwrapSchema<InnerSchema<T>>;

export type UnwrapSchema<T extends z.ZodTypeAny> = T extends z.ZodType<infer O>
	? KeysOfUnion<O>
	: never;

export type InnerSchema<T> = T extends z.ZodEffects<z.ZodEffects<z.ZodTypeAny>>
	? ReturnType<ReturnType<T['innerType']>['innerType']> // leaseCreateSchema needs to be unwrapped twice
	: T;

/**
 * Extracts keys from a Zod schema.
 */
export type KeyOfSchemaIntersection<T extends z.ZodTypeAny> =
	T extends z.ZodType<infer O> ? keyof O : never;

/**
 * Extracts and combines keys from multiple Zod schemas into a union.
 */
export type KeyOfMultipleSchemas<T extends z.ZodTypeAny[]> = T extends [
	...z.ZodType<infer U>[],
]
	? KeysOfUnion<U>
	: never;

export const keysOfSchema = <T extends z.AnyZodObject>(
	schema: T,
): KeyOfSchema<T> => schema.keyof().options;
