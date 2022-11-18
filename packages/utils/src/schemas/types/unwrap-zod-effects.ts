import type { leaseCreateSchema } from 'src/schemas/lease.schema';
import type { KeysOfSchema } from 'src/schemas/types/keys-of-schema';
import type { z, ZodObject, ZodTypeAny } from 'zod';

/**
 * Use infer to get inner type of ZodEffects.
 */
export type UnwrapZodEffects<T extends z.ZodTypeAny> = T extends z.ZodEffects<
	infer O
>
	? O
	: never;

/**
 * Use innerType() to get inner type of ZodEffects.
 */
export type UnwrapZodEffects2<T extends z.ZodEffects<any>> =
	T extends z.ZodEffects<ZodTypeAny> ? ReturnType<T['innerType']> : never;

type L = typeof leaseCreateSchema;

type UnwrappedInfer = UnwrapZodEffects<L>;

type UnwrappedInfer2 = UnwrapZodEffects2<UnwrappedInfer>;

type Keys = KeysOfSchema<UnwrappedInfer2>;

type UnwrapTwice<T extends z.ZodTypeAny> = T extends z.ZodEffects<infer O>
	? O extends z.ZodEffects<infer P>
		? P
		: never
	: never;

type L2 = UnwrapTwice<L>;
// type UnwrapKeys<T> = K
