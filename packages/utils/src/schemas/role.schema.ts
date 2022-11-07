import { z } from 'zod';

export const roleCreateSchema = z
	.object({
		email: z.string().email(),
	})
	.strict();

// Export types

export type RoleCreateSchema = z.infer<typeof roleCreateSchema>;
