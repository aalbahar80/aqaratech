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
		.transform((val) => Number(val) || 10),
});
