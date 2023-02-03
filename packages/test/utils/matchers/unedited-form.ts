/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { expect } from '@playwright/test';
import * as R from 'remeda';

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
