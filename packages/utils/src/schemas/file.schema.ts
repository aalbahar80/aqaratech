import { z } from 'zod';

import { fileRelationKeySchema } from './file-relation-key.schema';
import { filenameSchema } from './utils/filename.schema';
import { isID } from './utils/id.schema';

import type { File } from './types/file.type';

export const fileCreateSchema = z
	.object({
		fileName: filenameSchema,

		file: z
			.any()
			.refine(
				(value) => {
					if (value instanceof Blob) {
						// Check for file size because by default, the browser will add an
						// empty Blob object with size 0 when no file is selected.
						return value.size > 0;
					}
					return false;
				},
				{
					message: 'File is required',
				},
			)
			.transform((value) => value as File),

		relationKey: fileRelationKeySchema,
		relationValue: isID,
	})
	.strict();

export const fileFindAllOptionsSchema = fileCreateSchema.pick({
	relationKey: true,
	relationValue: true,
});

export const fileFindOneOptionsSchema = z.object({
	key: z.string(),
});

// Export types
export type FileCreateSchema = z.infer<typeof fileCreateSchema>;

export type FileFindAllOptionsSchema = z.infer<typeof fileFindAllOptionsSchema>;

export type FileFindOneOptionsSchema = z.infer<typeof fileFindOneOptionsSchema>;
