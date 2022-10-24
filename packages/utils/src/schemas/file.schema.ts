import { z } from 'zod';
import { fileRelationKeySchema } from './file-relation-key.schema';
import { isID } from './utils/id.schema';
import { zodString } from './utils/zod-string';

export const fileCreateSchema = z
	.object({
		organizationId: isID,
		fileName: zodString,
		file: z.record(z.any()).transform((value) => value as File),

		relationKey: fileRelationKeySchema,
		relationValue: isID,
	})
	.strict();
