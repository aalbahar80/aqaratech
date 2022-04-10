import type { InferMutationInput } from '$lib/client/trpc';

export interface IEntity<T extends 'properties'> {
	defaultForm: () => InferMutationInput<`${T}:create`>;
    // schema: z.AnyZodObject;
    // createSchema: z.AnyZodObject;
    // updateSchema: z.AnyZodObject;
}
// export abstract class AEntity {
//     public abstract singular: string;
//     // public abstract plural: string;
// }
