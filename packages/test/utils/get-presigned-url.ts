import { promises } from 'node:fs';

import { expect, type APIRequestContext } from '@playwright/test';
import { withQuery } from 'ufo';

import { apiURL } from '../tests/api/fixtures/api-url';

export const getPresignedUrl = async ({
	request,
	key,
}: {
	request: APIRequestContext;
	key: string;
}) => {
	const url = withQuery(`${apiURL}/files/find-one`, {
		key,
	});

	const response = await request.get(url);

	expect.soft(response.status()).toBe(200);

	const presignedUrl = await response.text();

	return presignedUrl;
};

export const verifyUploadedFile = async ({
	request,
	key,
	localFilePath,
}: {
	request: APIRequestContext;
	key: string;
	localFilePath: string;
}) => {
	const presignedUrl = await getPresignedUrl({ request, key });

	const res = await request.get(presignedUrl);

	const uploadedFile = await res.body();

	// file buffer matches

	const localFile = await promises.readFile(localFilePath);

	expect(uploadedFile.toString()).toEqual(localFile.toString());

	// file size matches

	expect(uploadedFile).toHaveLength(localFile.length);
};
