import { z } from 'zod';

export const filenameSchema = z
	.string()
	.max(100, {
		message: 'File name must be 100 characters or less.',
	})
	.regex(/^[\w\-.]+$/, {
		message:
			'Invalid characters. Only letters, numbers, dashes, underscores, and periods are allowed.',
	});
