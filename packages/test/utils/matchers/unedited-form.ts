import { expect, type Response } from '@playwright/test';
import * as R from 'remeda';

import { apiURL } from '../../tests/api/fixtures/api-url';

export const assertUneditedForm = (
	original: Record<string, unknown>,
	latest: Record<string, unknown>,
) => {
	return expect
		.soft(R.omit(original, ['updatedAt']))
		.toEqual(R.omit(latest, ['updatedAt']));
};

/** A helper function to get the response from the api */
export const fromApi = (
	res: Response,
	/** A function to additionally filter the response */
	constraints?: () => boolean,
) => {
	const url = new URL(res.url());
	return (
		url.href.includes(apiURL) &&
		// url.pathname.includes('tenants') &&
		res.request().method() === 'GET' &&
		(constraints ? constraints() : true)
	);
};
