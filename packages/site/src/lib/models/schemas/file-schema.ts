import { trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

export const schema = z.object({
	fileName: z.string().min(1, { message: 'Required' }).transform(trim),
	file: z.any(),
});
