import { zodnanoid } from '$lib/models/schemas/nano-id.schema';
import { falsyToNull, trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

export const schema = z.object({
	id: zodnanoid.optional(),
	labelEn: z.string().min(1, { message: 'Required' }).transform(trim),
	labelAr: z.string().nullable().transform(trim).transform(falsyToNull),
	isGroup: z.boolean(),
});
