import { falsyToNull } from '$lib/zodTransformers';
import { z } from 'zod';

export const zodIsDate = (required = false) =>
	required
		? z.string().min(1, { message: 'Required' })
		: z.string().nullable().transform(falsyToNull);
