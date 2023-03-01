import { promises } from 'node:fs';

import { expect, type APIRequestContext } from '@playwright/test';
import { resolveURL, withQuery } from 'ufo';

import { apiURL } from '../tests/api/fixtures/api-url';

export const getPresignedUrl = async ({
	request,
	key,
	organizationId,
}: {
	request: APIRequestContext;
	key: string;
	organizationId: string;
}) => {
	const url = withQuery(
		resolveURL(apiURL, 'organizations', organizationId, 'files', 'find-one'),
		{
			id: key,
		},
	);

	const response = await request.get(url);

	expect(response.status()).toBe(200);

	const presignedUrl = await response.text();

	return presignedUrl;
};

export const verifyUploadedFile = async ({
	request,
	key,
	localFilePath,
	organizationId,
}: {
	request: APIRequestContext;
	key: string;
	localFilePath: string;
	organizationId: string;
}) => {
	const presignedUrl = await getPresignedUrl({ request, key, organizationId });

	const res = await request.get(presignedUrl);

	const uploadedFile = await res.body();

	// file buffer matches

	const localFile = await promises.readFile(localFilePath);

	expect(uploadedFile.toString()).toEqual(localFile.toString());

	// file size matches

	expect(uploadedFile).toHaveLength(localFile.length);
};
