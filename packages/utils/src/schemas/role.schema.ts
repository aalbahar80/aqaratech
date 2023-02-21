import { z } from 'zod';

export const roleCreateSchema = z
	.object({
		email: z.string().email(),
	})
	.strict();

export const roleSchema = z
	.object({
		id: z.string().uuid(),
		email: z.string().email(),
		createdAt: z.date(),
		roleType: z.enum(['ORGADMIN', 'PORTFOLIO', 'TENANT']),
		organizationId: z.string().uuid(),
		portfolioId: z.string().uuid().nullable(),
		tenantId: z.string().uuid().nullable(),
	})
	.strict();

// Export types

export type RoleCreateSchema = z.infer<typeof roleCreateSchema>;

export type RoleSchema = z.infer<typeof roleSchema>;
