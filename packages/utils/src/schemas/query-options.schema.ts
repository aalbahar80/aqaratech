import { z } from 'zod';

export const queryOptionsParsedSchema = z
	.object({
		page: z.number().min(1),
		skip: z.number().min(0),
		take: z.number().min(1),
		sort: z.array(z.record(z.enum(['asc', 'desc']))),
		// filter: z.record(z.any()),
	})
	.strict();

export type QueryOptionsParsedSchema = z.infer<typeof queryOptionsParsedSchema>;
