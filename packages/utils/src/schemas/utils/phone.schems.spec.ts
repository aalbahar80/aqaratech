import { expect, test } from 'vitest';
import { phoneSchemaOptional } from './phone.schema';

const valid = ['12345678', '87654321', '', null, undefined];

const invalid = [
	' ',
	'123456789',
	'1234567',
	'1234567890',
	'12345678901',
	' 1234 5678 ',
	' 1234 5678 ',
	' 1234 5678 ',
];

test.each(valid)('valid: %s', (value) => {
	expect(phoneSchemaOptional.safeParse(value).success).toBe(true);
});

test.each(invalid)('invalid phone: %s', (phone) => {
	expect(phoneSchemaOptional.safeParse(phone).success).toBe(false);

	expect(() => phoneSchemaOptional.parse(phone)).toThrowError();
});

test.each(['', null])('%s is transformed to null', (value) => {
	expect(phoneSchemaOptional.safeParse(value)).toHaveProperty('data', null);
});

test.each([undefined])('%s is not transformed to null', (value) => {
	expect(phoneSchemaOptional.safeParse(value)).toHaveProperty(
		'data',
		undefined,
	);
});
