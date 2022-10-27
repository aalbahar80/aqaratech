import { z } from 'zod';

export const roleCreateSchema = z
	.object({
		email: z.string().email(),
	})
	.strict();

export type RoleCreateSchema = z.infer<typeof roleCreateSchema>;
