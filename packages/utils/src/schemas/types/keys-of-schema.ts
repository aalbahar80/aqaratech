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
