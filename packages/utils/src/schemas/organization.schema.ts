import { z } from 'zod';
import { zodStringOptional } from './utils/zod-string';

export const organizationSchema = z.object({
	fullName: z.string().trim().min(3, { message: 'Required' }),
	label: zodStringOptional,
});
