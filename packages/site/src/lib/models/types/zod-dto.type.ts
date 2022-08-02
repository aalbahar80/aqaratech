import type { z } from 'zod';

//@ts-ignore
export type ZodDto<T, S> = z.infer<S> extends T ? z.infer<S> : never;
// Also explore z.Schema<T>
