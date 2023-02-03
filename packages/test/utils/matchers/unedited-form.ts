/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { expect, type Response } from '@playwright/test';
import * as R from 'remeda';

import { apiURL } from '../../tests/api/fixtures/api-url';

export const assertUneditedForm = async (
	originalRes: Response,
	latestRes: Response,
) => {
	const original = await originalRes.json();
	const latest = await latestRes.json();

	return expect
		.soft(R.omit(original, ['updatedAt']))
		.toEqual(R.omit(latest, ['updatedAt']));
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
