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
