import { z } from 'zod';

export const paginationSchema = z.object({
	pageIndex: z
		.string()
		.or(z.number())
		.nullish()
		.transform((val) => Number(val) || 1),
	size: z
		.string()
		.or(z.number())
		.nullish()
		.transform((val) => Number(val) || 20),
});

export const withId = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
	schema.extend({
		id: z.string().uuid(),
	});
