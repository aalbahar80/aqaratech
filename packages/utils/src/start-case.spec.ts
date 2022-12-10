import { expect, test } from 'vitest';

import { startCase } from 'src/start-case';

const testCases = [
	['', ''],
	['foo', 'Foo'],
	['fooBar', 'Foo Bar'],
	['fooBarBaz', 'Foo Bar Baz'],

	['Foo', 'Foo'],
	['fooId', 'Foo Id'],

	[' foo  Bar  ', ' Foo  Bar  '],
	[' foo  Bar  ', ' Foo  Bar  '],
];

test.each(testCases)('startCase(%s)', (input, expected) => {
	const actual = startCase(input);
	expect(actual).toBe(expected);
});
