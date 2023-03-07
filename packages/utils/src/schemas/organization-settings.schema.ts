import { z } from 'zod';

export const organizationSettingsSchema = z
	.object({
		dueDuration: z
			.object({
				months: z.coerce.number().min(0),
				days: z.coerce.number().min(0),
			})
			.optional(),
	})
	.strict();

// Export types

export type OrganizationSettingsSchema = z.infer<
	typeof organizationSettingsSchema
>;
