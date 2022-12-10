import { describe, expect, test } from 'vitest';

import { PageType } from 'src/route-helpers/enums/page-type.enum';
import { getRoute } from 'src/route-helpers/get-route';
import { inferUrlRelation } from 'src/route-helpers/infer-url-relation';

import type { Entity } from 'src/entity/entity-definition';

type Input = [string, { entity: Entity; id: string }, string];

const inputs: Input[] = [
	// Expected cases
	[
		'/organizations/1/portfolios/2/files',
		{ entity: 'portfolio', id: '2' },
		'?relationKey=portfolio&relationValue=2',
	],
	[
		'/organizations/1/portfolios/2/properties/3/files',
		{ entity: 'property', id: '3' },
		'?relationKey=property&relationValue=3',
	],
	[
		'/organizations/1/portfolios/2/properties/3/units/4/files',
		{ entity: 'unit', id: '4' },
		'?relationKey=unit&relationValue=4',
	],
	[
		'/organizations/1/tenants/2/files',
		{ entity: 'tenant', id: '2' },
		'?relationKey=tenant&relationValue=2',
	],
	[
		'/organizations/1/files',
		{ entity: 'organization', id: '1' },
		'?relationKey=organization&relationValue=1',
	], // might not be needed
];

const entityTypes = ['portfolio', 'property', 'unit', 'tenant', 'organization'];

describe.each(entityTypes)('describe %s', () => {
	test.each(inputs)('%s', (url, expected) => {
		expect(inferUrlRelation(url)).toEqual(expected);
	});

	test.each(inputs)('with trailing slash: %s', (url) => {
		expect(() => inferUrlRelation(url + '/')).toThrow();
	});

	test.each(inputs)('with query: %s', (_url, expected, query) => {
		const route = getRoute({
			entity: 'file',
			pageType: PageType.New,
			params: {
				organizationId: '1',
			},
			predefined: {
				relationKey: expected.entity,
				relationValue: expected.id,
			},
		});

		const base = '/organizations/1/files/new';

		expect(route).toEqual(base + query);
	});
});

const unexpectedInputs: [string][] = [
	['/organizations/1/portfolios/2'],
	['/organizations/1/portfolios/2/properties/3'],
	['/organizations/1/portfolios/2/properties/3/units/4'],
	['/organizations/1/tenants/2'],

	// outlier cases
	['/organizations/1/files/2'],
	// ['/organizations/1/files/2/3'],
];

test.each(unexpectedInputs)('%s', (pathname) => {
	expect(() => inferUrlRelation(pathname)).toThrow();
});
