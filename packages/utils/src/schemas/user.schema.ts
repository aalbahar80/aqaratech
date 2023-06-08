import { z } from 'zod';

import { zodStringOptional } from './utils/zod-string';

import type { RoleSchema } from './role.schema';

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

export type UserSchema = UserCreateSchema & {
	id: string;
	phone: string | null;
	isPhoneVerified: boolean;
};

export type ValidatedUserSchema = UserSchema & {
	roles: (RoleSchema & {
		organization: {
			id: string;
			fullName: string;
			title: string;
			isActive: boolean;
		};
	})[];
};
