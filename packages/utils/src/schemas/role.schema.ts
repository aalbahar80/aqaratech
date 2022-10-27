import { z } from 'zod';
import { isID } from './utils/id.schema';

export const base = z.object({
	organizationId: isID.nullish(),
	portfolioId: isID.nullish(),
	tenantId: isID.nullish(),
	email: z.string().email(),
});

export const roleCreateSchema = base.superRefine((val, ctx) => {
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

export type RoleCreateSchema = z.infer<typeof roleCreateSchema>;
