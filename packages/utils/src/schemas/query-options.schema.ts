import { z } from 'zod';

export const queryOptionsSchema = z
	.object({
		page: z.number().min(1).optional(),
		limit: z.number().min(1).max(100).optional(),
		sort: z.array(z.string()).optional(),
		filter: z.record(z.any()).optional(),
	})
	.strict();
