import { CreateRelationKeyEnum } from '$api/openapi';
import { isID } from '$lib/models/schemas/id.schema';
import { trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

export const schema = z.object({
	organizationId: isID,
	fileName: z.string().min(1, { message: 'Required' }).transform(trim),

	// only check if file is truthy, server will check if file is valid
	file: z
		.any()
		.refine((value) => !!value, { message: 'Required' })
		.transform((value) => value as File),

	relationKey: z.nativeEnum(CreateRelationKeyEnum),
	relationValue: isID,
});
