import { expect } from '@playwright/test';
import { resolveURL, withQuery } from 'ufo';

import { getPresignedUrl } from '../../../utils/get-presigned-url';
import { test } from '../api-fixtures';

test.use({
	baseURL: process.env.PUBLIC_API_URL,
	createBucket: true,
});

test.describe('initial bucket state', () => {
	test('return ok response', async ({ request, portfolio }) => {
		const url = withQuery(
			resolveURL('organizations', portfolio.organizationId, 'files'),
			{
				relationKey: 'portfolio',
				relationValue: portfolio.id,
			},
		);

		const res = await request.get(url);

		expect(res.status()).toBe(200);

		expect(await res.json()).toMatchObject({
			results: [],
		});
	});

	test('handle initial uploads', async ({ request, portfolio }) => {
		const url = withQuery(`organizations/${portfolio.organizationId}/files`, {
			relationKey: 'portfolio',
			relationValue: portfolio.id,
		});

		const fileName = 'test.txt';

		const res = await request.post(url, {
			multipart: {
				fileName: fileName,
				relationKey: 'portfolio',
				relationValue: portfolio.id,
				file: {
					name: fileName,
					mimeType: 'text/plain',
					buffer: Buffer.from('hello world'),
				},
			},
		});

		expect(res.status()).toBe(201);

		const data = await res.text();
		expect(data).toBe('test.txt');
	});
});

test('files can be deleted', async ({ request, org, file }) => {
	const url = withQuery(
		resolveURL('organizations', org.organization.id, 'files'),
		{
			id: file,
		},
	);

	// console.log({ url });
	const res = await request.delete(url);

	expect(res.status()).toBe(200);
});

test('files can be downloaded', async ({ request, org, file }) => {
	const url = await getPresignedUrl({
		request,
		key: file,
		organizationId: org.organization.id,
	});

	// console.log({ url });
	const res = await request.fetch(url); // request.get fails here

	expect.soft(res.status()).toBe(200);

	const downloaded = await res.text();

	expect(downloaded.toString()).toBe('hello world');
});
