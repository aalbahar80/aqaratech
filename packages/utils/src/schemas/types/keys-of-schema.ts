import type { KeysOfUnion } from '../../keys-of-union';
import type { z } from 'zod';

/** Extracts keys from a Zod schema. */
export type KeyOfSchema<T extends z.ZodTypeAny> = T extends z.ZodType<infer O>
	? KeysOfUnion<O>
	: never;
