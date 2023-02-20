import { expect, test } from 'vitest';

import { featureSchema } from './feature.schema';

const testCases = [
	{
		name: 'validates plan feature string',
		input: 'plan:basic@2023-02-13',
		expected: true,
	},
	{
		name: 'validates feature string with plan',
		input: 'feature:feature-1@plan:basic@2023-02-13',
		expected: true,
	},
	{
		name: 'does not validate invalid string',
		input: 'invalid-string',
		expected: false,
	},
];

test.each(testCases)('featureSchema %s', (t) => {
	const { input, expected } = t;
	const parsed = featureSchema.safeParse(input);
	expect(parsed.success).toBe(expected);
});
