import { expect, test } from 'vitest';
import { civilidSchemaOptional } from './civilid.schema';

const valid = ['123456789012', '000000000000'];

const invalid = ['12345678901', '1234567890123', '1234567890', '1234567 89012'];

test.each(valid)('valid: %s', (value) => {
	expect(civilidSchemaOptional.safeParse(value).success).toBe(true);
});

test.each(invalid)('invalid civilid: %s', (civilid) => {
	expect(civilidSchemaOptional.safeParse(civilid).success).toBe(false);

	expect(() => civilidSchemaOptional.parse(civilid)).toThrowError();
});
