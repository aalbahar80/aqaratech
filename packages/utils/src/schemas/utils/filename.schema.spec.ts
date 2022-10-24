import { expect, test } from 'vitest';
import { FILENAMES } from './constants/filenames';
import { filenameSchema } from './filename.schema';

test.each(FILENAMES.VALID)('valid: %s', (value) => {
	expect(filenameSchema.safeParse(value).success).toBe(true);
});

test.each(FILENAMES.INVALID)('invalid filename: %s', (filename) => {
	expect(filenameSchema.safeParse(filename).success).toBe(false);

	expect(() => filenameSchema.parse(filename)).toThrowError();
});
