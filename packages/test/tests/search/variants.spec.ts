import { expect } from '@playwright/test';
import { joinURL, withQuery } from 'ufo';

import { test as base } from '../api/api-fixtures';
import { apiURL } from '../api/fixtures/api-url';

import { inputs } from './test-data';

import type { SearchDto } from '../../types/api';

// PERF: Make tests re-use organization fixture

const test = base.extend<{
	searchUrl: string;
}>({
	searchUrl: async (
		{
			org,
			portfolios: _portfolios,
			tenants: _tenants,
			properties: _properties,
		},
		use,
	) => {
		const base = joinURL(
			apiURL,
			'organizations',
			org.organization.id,
			'search',
		);

		await use(base);
	},
});

test.use({
	portfoliosParams: [{ fullName: 'Alex Anderson' }],
	tenantsParams: [{ fullName: 'Bob Brown' }],
	propertiesParams: [{ street: 'The Main St' }],
});

for (const i of inputs) {
	test.describe(`search for ${i.type} - ${i.queryExact}`, () => {
		test.describe.configure({ mode: 'parallel' });

		const testCases = [
			i.queryExact,
			i.queryExact.toLowerCase(),
			i.queryExact.toUpperCase(),
			i.queryPrefix,
			i.queryPrefix.toLowerCase(),
			i.queryPrefix.toUpperCase(),
			i.querySuffix,
			// i.querySuffix.toLowerCase(), // already lowercased
			i.querySuffix.toUpperCase(),
			// with spaces
			` ${i.queryExact} `,
		];

		for (const q of testCases) {
			test(`exact: ${i.type}-${q} ${i.queryExact} `, async ({
				request,
				searchUrl,
			}) => {
				const query = q;

				const url = withQuery(searchUrl, { query });

				const res = await request.get(url);

				expect.soft(res.status()).toBe(200);

				const data = (await res.json()) as SearchDto;

				const results = [...data.portfolio, ...data.tenant, ...data.property];

				expect.soft(results).toHaveLength(1);

				const key = i.keysToValidate[0][0];
				const value = i.keysToValidate[0][1];

				const result = results[0];

				expect.soft(result).toHaveProperty(key, value);
			});
		}
	});
}

const invalid = [
	' ',
	'  ',
	encodeURIComponent(''),
	encodeURIComponent(' '),
	encodeURIComponent('  '),
];

for (const q of invalid) {
	test(`does not return error for empty query - ${q}`, async ({
		request,
		searchUrl,
	}) => {
		const url = withQuery(searchUrl, { query: q });

		const res = await request.get(url);

		expect.soft(res.status()).toBe(200);
	});
}
