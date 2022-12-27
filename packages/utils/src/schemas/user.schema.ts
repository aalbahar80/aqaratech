import { z } from 'zod';

import { zodStringOptional } from './utils/zod-string';

export const userCreateSchema = z
	.object({
		fullName: zodStringOptional,
		email: z.string().email(),
	})
	.strict();

export const userUpdateSchema = userCreateSchema.pick({
	fullName: true,
});

// Export types

export type UserCreateSchema = z.infer<typeof userCreateSchema>;

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
