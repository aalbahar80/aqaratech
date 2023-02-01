import { expect, type ConsoleMessage } from '@playwright/test';

import { test } from './setup';

test('invalid date does not trigger http call - multiple', async ({
	page,
	filters,
}) => {
	page.on('request', (request) => {
		// force test to fail if a request is made
		expect(request.url()).toContain('--');
	});

	// set start date in the future
	await filters.start.fill('2030-01-01');

	const errors: ConsoleMessage[] = [];

	// check console for errors
	page.on('console', (msg) => {
		errors.push(msg);
	});

	// set invalid end dates
	await filters.end.fill('2019-01-01');
	await filters.end.fill('2020-01-01');
	await filters.end.fill('2021-01-01');
	await filters.end.fill('2022-01-01');
	await filters.end.fill('2023-01-01');

	// check for errors
	expect(errors).toHaveLength(5);

	for (const error of errors) {
		expect(error.text()).toBe('Invalid date range');
	}
});
