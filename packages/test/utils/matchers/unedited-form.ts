import { expect, type Response } from '@playwright/test';
import * as R from 'remeda';

import { apiURL } from '../../tests/api/fixtures/api-url';

export const assertUneditedForm = async (
	originalRes: Response,
	latestRes: Response,
) => {
	const original: unknown = await originalRes.json();
	const latest: unknown = await latestRes.json();

	return (
		expect
			// @ts-expect-error test
			.soft(R.omit(original, ['updatedAt']))
			// @ts-expect-error test
			.toEqual(R.omit(latest, ['updatedAt']))
	);
};

/** A helper function to get the response from the api */
export const fromApi = (res: Response) => {
	const url = new URL(res.url());
	return (
		url.href.includes(apiURL) &&
		// url.pathname.includes('tenants') &&
		res.request().method() === 'GET'
	);
};
