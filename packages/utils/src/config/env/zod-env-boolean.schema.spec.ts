import { describe, expect, test } from 'vitest';

import { zodEnvBooleanSchema } from './zod-env-boolean.schema';

const sample = [
	['', false],
	[' ', false],
	['0', false],
	['1', true],
] as const;

describe('zodEnvBooleanSchema', () => {
	const schema = zodEnvBooleanSchema();

	test('throws if not declared', () => {
		// @ts-expect-error - expected to fail
		expect(() => schema.parse()).toThrow();
	});

	test.each(sample)('parses %s to %s', (input, parsed) => {
		expect(schema.parse(input)).toBe(parsed);
	});
});

describe('zodEnvBooleanSchema.optional', () => {
	const schema = zodEnvBooleanSchema().optional();

	test('does not throw if not declared', () => {
		// @ts-expect-error - expected to fail
		expect(() => schema.parse()).not.toThrow();
	});

	test('defaults to undefined', () => {
		// @ts-expect-error - expected to fail
		expect(schema.parse()).toBe(undefined);
	});

	test.each(sample)('parses %s to %s', (input, parsed) => {
		expect(schema.parse(input)).toBe(parsed);
	});
});

describe.each([true, false])('zodEnvBooleanSchema.default', (defaultValue) => {
	// @ts-expect-error - zod wrongly infers the type
	const schema = zodEnvBooleanSchema().default(defaultValue);

	test('does not throw if not declared', () => {
		// @ts-expect-error - expected to fail
		expect(() => schema.parse()).not.toThrow();
	});

	test('defaults to correct value', () => {
		// @ts-expect-error - expected to fail
		expect(schema.parse()).toBe(defaultValue);
	});

	test.each(sample)('parses %s to %s', (input, parsed) => {
		expect(schema.parse(input)).toBe(parsed);
	});
});
