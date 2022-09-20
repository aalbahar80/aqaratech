import { isID } from '$lib/models/schemas/id.schema';
import { trim } from '$lib/zodTransformers.js';
import { CreateRelationKeyEnum } from '$api/openapi';
import { z } from 'zod';

export const schema = z.object({
	organizationId: isID,
	fileName: z.string().min(1, { message: 'Required' }).transform(trim),
	file: z.any(),

	// Do not change. Specifically, this is sent using the multipart/form-data content type,
	// Which causes the api sdk to change null to "null". Therefore, falsey values should NOT be sent.
	relationKey: z.nativeEnum(CreateRelationKeyEnum),
	relationValue: isID,
});
