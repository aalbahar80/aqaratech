import { expect } from '@playwright/test';
import { withQuery } from 'ufo';
import { test } from '../api-config';

test('handle noSuchBucket gracefully', async ({ request, portfolio }) => {
	const url = withQuery('/files', {
		relationKey: 'portfolio',
		relationValue: portfolio.id,
	});

	const res = await request.get(url);

	expect(res.status()).toBe(200);

	expect(await res.json()).toMatchObject({
		results: [],
	});
});

test('buckets are automatically created', async ({ request, portfolio }) => {
	const url = withQuery('/files', {
		relationKey: 'portfolio',
		relationValue: portfolio.id,
	});

	const fileName = 'test.txt';

	const res = await request.post(url, {
		multipart: {
			fileName: fileName,
			relationKey: 'portfolio',
			relationValue: portfolio.id,
			organizationId: portfolio.organizationId,
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

test('files can be deleted', async ({ request, file }) => {
	const url = withQuery('/files', {
		key: file,
	});

	console.log({ url }, 'files.spec.ts ~ 53');
	const res = await request.delete(url);

	expect(res.status()).toBe(200);
});
