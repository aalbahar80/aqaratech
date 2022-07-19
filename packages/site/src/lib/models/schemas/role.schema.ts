import { zodnanoid } from '$lib/models/schemas/nano-id.schema';
import { z } from 'zod';

export const base = z.object({
	organizationId: zodnanoid.optional(),
	portfolioId: zodnanoid.optional(),
	tenantId: zodnanoid.optional(),
	email: z.string().email(),
});

export const createSchema = base.superRefine((val, ctx) => {
	if (
		+Boolean(val.organizationId) +
			+Boolean(val.portfolioId) +
			+Boolean(val.tenantId) !==
		1
	) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['organizationId'],
			message: 'Only one of org, portfolio, or tenant must be selected.',
		});
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['portfolioId'],
			message: 'Only one of org, portfolio, or tenant must be selected.',
		});
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['tenantId'],
			message: 'Only one of org, portfolio, or tenant must be selected.',
		});
	}
});
