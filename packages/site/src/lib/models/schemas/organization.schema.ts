import { isID } from '$lib/models/schemas/nano-id.schema';
import { falsyToNull, trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

export const schema = z.object({
	id: isID.optional(),
	fullName: z.string().min(1, { message: 'Required' }).transform(trim),
	label: z.string().nullable().transform(trim).transform(falsyToNull),
});
