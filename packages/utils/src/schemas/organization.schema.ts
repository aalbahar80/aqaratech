import { z } from 'zod';

import { organizationSettingsSchema } from './organization-settings.schema';
import { zodStringOptional } from './utils/zod-string';

export const organizationSchema = z.object({
	fullName: z.string().trim().min(3, { message: 'Required' }),
	label: zodStringOptional,
	settings: organizationSettingsSchema.optional(),
});

// Export types

export type OrganizationSchema = z.infer<typeof organizationSchema>;
