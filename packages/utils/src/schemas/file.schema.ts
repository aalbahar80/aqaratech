import { z } from 'zod';
import { fileRelationKeySchema } from './file-relation-key.schema';
import { isID } from './utils/id.schema';
import { trim } from './utils/zod-transformers';

export const fileCreateSchema = z
	.object({
		organizationId: isID,
		fileName: z.string().min(1, { message: 'Required' }).transform(trim),
		file: z.record(z.any()).transform((value) => value as File),

		relationKey: fileRelationKeySchema,
		relationValue: isID,
	})
	.strict();
