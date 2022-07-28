import type { z } from 'zod';

export type ZodDto<T, S> = z.infer<S> extends T ? z.infer<S> : never;
