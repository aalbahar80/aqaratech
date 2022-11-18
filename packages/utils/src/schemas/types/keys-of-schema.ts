import type { z } from 'zod';

/**
 * Extracts keys from a Zod schema.
 *
 * Uses `schema.keyof().options` to get the keys.
 */
export type KeysOfSchema<T extends z.AnyZodObject> = ReturnType<
	T['keyof']
>['options'];

export const keysOfSchema = <T extends z.AnyZodObject>(
	schema: T,
): KeysOfSchema<T> => schema.keyof().options;
