import { expect, type ConsoleMessage } from '@playwright/test';

import { test } from './setup';

test('invalid date does not trigger http call', async ({ page, filters }) => {
	page.on('request', (request) => {
		// force test to fail if a request is made
		expect(request.url()).toContain('--');
	});

	const errors: ConsoleMessage[] = [];

	// check console for errors
	page.on('console', (msg) => {
		errors.push(msg);
	});

	// set invalid end date
	await filters.end.fill('1990-01-01');

	// check for errors
	expect(errors).toHaveLength(1);

	for (const error of errors) {
		expect(error.text()).toBe('Invalid date range');
	}
});
