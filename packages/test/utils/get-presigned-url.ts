import { APIRequestContext, expect } from '@playwright/test';
import { withQuery } from 'ufo';

export const getPresignedUrl = async ({
	request,
	key,
}: {
	request: APIRequestContext;
	key: string;
}) => {
	const url = withQuery('/files/find-one', {
		key,
	});

	const response = await request.get(url);

	expect.soft(response.status()).toBe(200);

	const presignedUrl = await response.text();
	console.log({ presignedUrl });

	return presignedUrl;
};
