import { describe, expect, test } from 'vitest';

import { zodEnvBooleanSchema } from './zod-env-boolean.schema';

describe('zodEnvBooleanSchema', () => {
	const schema = zodEnvBooleanSchema();

	test('throws if not declared', () => {
		// @ts-expect-error - expected to fail
		expect(() => schema.parse()).toThrow();
	});

	test('parses correctly', () => {
		expect(schema.parse('')).toBe(false);
		expect(schema.parse(' ')).toBe(false);
		expect(schema.parse('0')).toBe(false);

		expect(schema.parse('1')).toBe(true);
	});
});

describe('zodEnvBooleanSchema.optional', () => {
	const schema = zodEnvBooleanSchema().optional();

	test('does not throw if not declared', () => {
		// @ts-expect-error - expected to fail
		expect(() => schema.parse()).not.toThrow();
	});

	test('parses correctly', () => {
		// @ts-expect-error - expected to fail
		expect(schema.parse()).toBe(undefined);
		expect(schema.parse('')).toBe(false);
		expect(schema.parse(' ')).toBe(false);
		expect(schema.parse('0')).toBe(false);

		expect(schema.parse('1')).toBe(true);
	});
});

describe.each([true, false])('zodEnvBooleanSchema.default', (defaultValue) => {
	// @ts-expect-error - zod wrongly infers the type
	const schema = zodEnvBooleanSchema().default(defaultValue);

	test('defaults to correct value', () => {
		// @ts-expect-error - expected to fail
		expect(schema.parse()).toBe(defaultValue);
	});

	test('does not throw if not declared', () => {
		// @ts-expect-error - expected to fail
		expect(() => schema.parse()).not.toThrow();
	});

	test('parses correctly', () => {
		expect(schema.parse('')).toBe(false);
		expect(schema.parse(' ')).toBe(false);
		expect(schema.parse('0')).toBe(false);

		expect(schema.parse('1')).toBe(true);
	});
});
