import { expect, test } from 'vitest';
import { civilidSchemaOptional } from './civilid.schema';
import { phoneSchemaOptional } from './phone.schema';

const valid = ['', null, undefined];

const invalid = [' '];

test.each(valid)('valid: %s', (value) => {
	expect(phoneSchemaOptional.safeParse(value).success).toBe(true);
	expect(civilidSchemaOptional.safeParse(value).success).toBe(true);
});

test.each(invalid)('invalid: %s', (value) => {
	expect(phoneSchemaOptional.safeParse(value).success).toBe(false);
	expect(civilidSchemaOptional.safeParse(value).success).toBe(false);

	expect(() => phoneSchemaOptional.parse(value)).toThrowError();
	expect(() => civilidSchemaOptional.parse(value)).toThrowError();
});

test.each(['', null])('%s is transformed to null', (value) => {
	expect(phoneSchemaOptional.safeParse(value)).toHaveProperty('data', null);
	expect(civilidSchemaOptional.safeParse(value)).toHaveProperty('data', null);
});

test.each([undefined])('%s is not transformed to null', (value) => {
	expect(phoneSchemaOptional.safeParse(value)).toHaveProperty(
		'data',
		undefined,
	);

	expect(civilidSchemaOptional.safeParse(value)).toHaveProperty(
		'data',
		undefined,
	);
});
