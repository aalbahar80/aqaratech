import { isNil } from 'remeda';
import { z } from 'zod';

export const queryOptionsRequestSchema = z
	.object({
		page: z.preprocess((input) => {
			if (isNil(input)) return undefined;
			return parseInt(input as string, 10);
		}, z.number().min(1)),
		limit: z.preprocess((input) => {
			if (isNil(input)) return undefined;
			return parseInt(input as string, 10);
		}, z.number().min(1)),
		sort: z.array(z.string()),
		// filter: z.record(z.any()),
	})
	.strict()
	.partial();

export const queryOptionsParsedSchema = z
	.object({
		page: z.number().min(1),
		skip: z.number().min(0),
		take: z.number().min(1),
		sort: z.array(z.record(z.enum(['asc', 'desc']))),
		// filter: z.record(z.any()),
	})
	.strict();
