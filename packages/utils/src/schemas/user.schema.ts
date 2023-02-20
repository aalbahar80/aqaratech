import { z } from 'zod';

import { roleSchema } from './role.schema';
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

export const userSchema = userCreateSchema
	.extend({
		id: z.string().uuid(),
		email: z.string().email(),
		roles: z.array(
			roleSchema.extend({
				// TODO: constrain with organizationSchema
				organization: z
					.object({
						id: z.string().uuid(),
						fullName: z.string(),
						title: z.string(),
						isActive: z.boolean(),
					})
					.strict(),
			}),
		),
	})
	.strict();

// Export types

export type UserCreateSchema = z.infer<typeof userCreateSchema>;

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;

export type UserSchema = z.infer<typeof userSchema>;
// type A =UserSchema['email']
