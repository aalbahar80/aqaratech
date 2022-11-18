import type { z } from 'zod';

export type UnwrapZodEffects<T extends z.ZodTypeAny> = T extends z.ZodEffects<
	infer O
>
	? O
	: never;
