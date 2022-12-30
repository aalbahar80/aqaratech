import { z } from 'zod';

import { fileRelationKeySchema } from './file-relation-key.schema';
import { filenameSchema } from './utils/filename.schema';
import { isID } from './utils/id.schema';

export const fileCreateSchema = z
	.object({
		fileName: filenameSchema,
		// @ts-ignore
		// backend complains without adding lib: ["dom"] to tsconfig
		file: z.record(z.any()).transform((value) => value as File),

		relationKey: fileRelationKeySchema,
		relationValue: isID,
	})
	.strict();

// Export types
export type FileCreateSchema = z.infer<typeof fileCreateSchema>;
