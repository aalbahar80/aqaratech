import { z } from 'zod';

export const filenameSchema = z.string().regex(/^[a-zA-Z0-9-_.]+$/, {
	message:
		'Invalid characters. Only letters, numbers, dashes, underscores, and periods are allowed.',
});
