import { expect } from '@playwright/test';
import { withQuery } from 'ufo';
import { getPresignedUrl } from '../../../utils/get-presigned-url';
import { test } from '../api-fixtures';

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

	console.log({ url });
	const res = await request.delete(url);

	expect(res.status()).toBe(200);
});

test('files can be downloaded', async ({ request, file }) => {
	const url = await getPresignedUrl({
		request,
		key: file,
	});

	console.log({ url });
	const res = await request.fetch(url); // request.get fails here

	expect.soft(res.status()).toBe(200);

	const downloaded = await res.text();

	expect(downloaded.toString()).toBe('hello world');
});
